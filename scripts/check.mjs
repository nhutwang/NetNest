import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {Script,runInNewContext} from 'node:vm';

const root=new URL('../',import.meta.url);
const bytes=await readFile(new URL('index.html',root));
const html=bytes.toString('utf8');
const stateSource=html.match(/\/\* STORY_STATE_START \*\/([\s\S]*?)\/\* STORY_STATE_END \*\//);
assert(stateSource,'Missing deterministic story state for PDF fixes');
const {storyAt,cameraAt,dimensionOpacity,modelCopy,presentationAt,detailOpacity,technicalRulers,technicalView,sceneFrameAt,captionAt,collectionTypeAt,textMotionAt,shelfPlacement,pacedTime,pacedProgress,STORY_TARGETS,END}=runInNewContext(stateSource[1]+';({storyAt,cameraAt,dimensionOpacity,modelCopy,presentationAt,detailOpacity,technicalRulers,technicalView,sceneFrameAt,captionAt,collectionTypeAt,textMotionAt,shelfPlacement,pacedTime,pacedProgress,STORY_TARGETS,END})');
for(const [start,end,keys] of [[2.45,4.2,['visionTitle','visionSubtitle','visionBody']],[21.9,23.39,['finalTitle','finalPrice','finalBody']]]){
 let previous=textMotionAt(start);
 for(let t=start+.002;t<end;t+=.002){const next=textMotionAt(t);for(const key of keys)assert(next[key]>=previous[key]-1e-12&&next[key]<=1+1e-12,'Text must reveal once, then remain visible');previous=next;}
 for(const key of keys)assert.equal(textMotionAt(end)[key],1,'Text must remain visible during the reading hold');
}
for(let t=9.32;t<=9.62;t+=.01){const s=storyAt(t),p=shelfPlacement(s);assert.equal(p.x,0,'Removing the shelf must not push it into the frame or caption');assert.equal(p.z,0);assert(Math.abs(p.opacity-(1-s.shelfRemove))<1e-10);}
assert.equal(shelfPlacement(storyAt(9.7)).opacity,0,'The open configuration has no shelf');
assert.equal(shelfPlacement(storyAt(11.4)).opacity,1,'The shelf returns when the assembly view resumes');
let previousType=collectionTypeAt(4.3);
for(let t=4.302;t<6.2;t+=.002){const next=collectionTypeAt(t);for(const key of Object.keys(next))assert(next[key]>=previousType[key]-1e-12&&next[key]<=1+1e-12,'Type reveals must not flash or reverse within their reading hold');previousType=next;}
for(const value of Object.values(collectionTypeAt(STORY_TARGETS.collections)))assert.equal(value,1,'Collection navigation must arrive after the text reveal');
const collectionMarkup=html.match(/<section class="sc" id="s3"[\s\S]*?<\/section>/)?.[0];
assert(collectionMarkup&&!/<img\b/.test(collectionMarkup),'Collections must use live text, not photographs');
for(const label of ['SPACE COLLECTION','MOTION COLLECTION'])assert(collectionMarkup.includes('aria-label="'+label+'"'),'Animated lettering must keep an accessible collection heading');
let previousTime=-1;
for(let p=0;p<=1;p+=.001){
 const t=pacedTime(p);assert(t>=previousTime,'Scroll pacing must always move forward');previousTime=t;
 assert(Math.abs(pacedProgress(t)-p)<1e-10,'Navigation must invert the paced timeline exactly');
}
assert.equal(pacedTime(0),0);assert.equal(pacedTime(1),END);
// ScrollTrigger returns false for getTween() when scrub is immediate; navigation must still work.
const seekSource=html.match(/(function seekStoryTime\(target\)\{[\s\S]*?)\r?\n \}/)?.[1]+'\n}';
assert(seekSource.startsWith('function seekStoryTime'),'Missing story navigation function');
for(const tween of [false,null,{progress(value){assert.equal(value,1);}}]){
 const playhead={time:0},scrolled=[],painted=[];
 const seek=runInNewContext(stateSource[1]+seekSource+';seekStoryTime',{
  tl:{scrollTrigger:{start:0,end:100,getTween:()=>tween},progress(){}},scrollController:null,window:{scrollTo:options=>scrolled.push(options.top)},ScrollTrigger:{update(){}},playhead,paint:value=>painted.push(value)
 });
 seek(STORY_TARGETS.linea);assert.equal(playhead.time,STORY_TARGETS.linea);assert.equal(painted[0],STORY_TARGETS.linea);assert(Math.abs(scrolled[0]-100*pacedProgress(STORY_TARGETS.linea))<1e-10);
}
for(const [start,end,chapter] of [[2.45,4.29,2],[4.3,6.69,3],[21.9,END,7]]){
 assert.equal(sceneFrameAt(start).reveal,0,'Incoming scene starts fully covered');
 let previousReveal=0;
 for(let t=start;t<=end;t+=.002){
  const frame=sceneFrameAt(t);
  assert.equal(frame.chapter,chapter);
  assert(frame.reveal>=previousReveal-1e-12&&frame.reveal<=1+1e-12,'Curtain reveal must be monotonic and bounded');
  assert.equal(frame.previous,frame.reveal<1?chapter-1:0,'Retain the outgoing scene until the curtain fully reveals its replacement');
  if(t>=start+.38)assert.equal(frame.reveal,1,'Keep the incoming scene fully revealed through its reading hold');
  previousReveal=frame.reveal;
 }
 assert.equal(sceneFrameAt(end).reveal,1);
 assert.equal(sceneFrameAt(end).previous,0);
}
assert.equal(captionAt(10.2),null,'Material callout must not duplicate an inspector paragraph');
assert.equal(captionAt(11.2),null,'Detail callout must not duplicate Product details');
assert.equal(captionAt(17.2).title,captionAt(18.4).title,'Folding title stays stable through its mechanism sequence');
for(const [name,chapter] of [['top',1],['collections',3],['linea',4],['roam',6]])assert.equal(storyAt(STORY_TARGETS[name]).chapter,chapter,'Explore target must resolve to its intended chapter');
assert.equal(storyAt(2.7).chapter,2);assert.equal(storyAt(4.55).chapter,3);
assert(!html.includes('~2.10M')&&!html.includes('~2.22M'),'Remove market scene per new PDF');
assert(html.includes('Our vision')&&html.includes('A Vietnamese word for a distinctive line'),'Brand meaning and vision are required');
assert(html.includes('data-story-target="linea"')&&html.includes('data-story-target="roam"'),'Explore must navigate to both products');
assert.equal(storyAt(0).chapter,1);assert.equal(storyAt(END).chapter,7);
for(const [start,end] of [[.78,2.44]]){
 let previous=0;
 for(let t=start;t<end;t+=.002){const visible=presentationAt(t).contentOpacity;assert(visible>=previous-1e-12,'A new scene must fade in once, never flash and fade before appearing');previous=visible;}
 assert.equal(presentationAt(end).contentOpacity,1,'Scene must remain fully visible through the hold');
}
assert.equal(presentationAt(.78).contentOpacity,0);
// Exercise the actual DOM update function: pure story-state tests cannot catch stale captions.
const syncSource=html.match(/(function syncText\(state,t\)\{[\s\S]*?)\r?\nfunction paint\(/);
assert(syncSource,'Missing story text synchronization function');
function testNode(){return {hidden:false,textContent:'',dataset:{},children:{},attributes:{},style:{setProperty(){}},classList:{toggle(){}},setAttribute(name,value){this.attributes[name]=value;},getAttribute(name){return name==='src'?this.src:this.attributes[name];},querySelector(selector){return this.children[selector]??=testNode();},querySelectorAll(){return [];}};}
const fallbackInspector=testNode(),fallbackUi=Object.fromEntries(['stage','brand','logo','hero','vision','visionSection','collection','finalSection','panel','finishes','nav','wipe','fallback'].map(key=>[key,testNode()]));
fallbackUi.finishButtons=[testNode(),testNode()];
const syncFallback=runInNewContext(stateSource[1]+syncSource[1]+';t=>syncText(storyAt(t),t)',{
 ready:false,reduced:false,lastChapter:0,lastPanel:'',lastStep:'',selectedFinishes:{linea:0,roam:0},
 FINISHES:{linea:[['Rustic Brown','#875733'],['Natural Oak','#c4a170']],roam:[['White','#e9e7df'],['Black','#282a29']]},
 ui:fallbackUi,inspector:fallbackInspector,sections:Array.from({length:7},testNode),document:{body:{dataset:{}}},setMotionHeading:(node,text)=>{node.textContent=text;}
});
for(const [time,title,product] of [[6.4,null,'linea'],[7.2,'LINEA','linea'],[12.9,'LINEA','linea'],[13.3,null,'linea'],[13.9,null,'roam'],[14.5,'ROAM','roam'],[21.8,'ROAM','roam'],[22,null,'roam'],[6.4,null,'linea'],[7.2,'LINEA','linea'],[15.4,'ROAM','roam'],[13.9,null,'roam'],[12.9,'LINEA','linea']]){
 syncFallback(time);
 assert.equal(fallbackInspector.hidden,title===null,'Fallback caption must not cover a scene transition at '+time);
 if(title!==null)assert.equal(fallbackInspector.querySelector('h2').textContent,title,'Fallback caption must match the current product after forward/reverse navigation');
 assert.equal(fallbackUi.fallback.src,'assets/'+product+'-lifestyle.jpg');
 assert.equal(fallbackUi.panel.hidden,true,'Fallback must keep 3D finish controls hidden');
}
assert(!html.includes('id="s4"')&&!html.includes('id="s9"'),'Remove repeated LINEA introduction and ending photos');
for(const heading of ['Ready to go.','A considered connection.','The next chapter.','Two Perspectives.'])assert(!html.includes(heading),'Remove unsupported or repeated editorial copy: '+heading);
for(const [time,height] of [[8.15,.1],[8.65,.25],[9.15,.4]])assert.equal(storyAt(time).shelfHeight,height);
assert.equal(storyAt(9.7).shelfRemove,1);
assert(storyAt(8.4).shelfHeight>.1&&storyAt(8.4).shelfHeight<.25);
assert(storyAt(16.3).roamHeight>.55&&storyAt(16.3).roamHeight<.65);
assert(html.includes("state.measureMode==='shelf'?state.shelfHeight:state.roamHeight"),'Ruler values must follow live geometry');
assert.equal(storyAt(7.6).dimReveal,1);
for(const time of [8.15,8.65,9.15,16.05,16.4,16.75]){
 assert.equal(storyAt(time).measureOnly,true,'Height belongs on the model, not in a caption');
 assert.equal(storyAt(time).dimensions,true);
}
assert.deepEqual(cameraAt(7.15),cameraAt(7.65),'Dimension camera must remain still');
for(const [a,b] of [[7.1,9.2],[15.2,16.8]])assert.deepEqual(cameraAt(a),cameraAt(b),'Ruler camera cannot drift with scroll');
for(const t of [7.2,8.15,8.4,8.65,8.9,9.15,15.4,15.9,16.09,16.25,16.445,16.6,16.75])assert.equal(dimensionOpacity(t),1);
for(const t of [6.8,7.8,9.3,15.05,15.8,16.85])assert.equal(dimensionOpacity(t),0);
assert(!/strokeDasharray|strokeDashoffset|getTotalLength/.test(html),'Rulers fade without stroke drawing');
for(const product of ['linea','roam']){
 const rulers=technicalRulers({product,measureOnly:false});
 const length=rulers[0],depth=rulers[2],height=rulers[1];
 assert.deepEqual(length.b,depth.a,'Length/depth must share the same raised back corner, as reference photos');
 assert(length.a[2]<0,'Length ruler belongs on the rear edge');
 assert(length.a[1]>height.b[1],'Top rulers sit above the top surface');
 assert.deepEqual(length.a.map((n,i)=>n-length.b[i]),length.edgeA.map((n,i)=>n-length.edgeB[i]));
 assert.equal(length.a[2],length.b[2]);assert.equal(length.a[1],length.b[1]);
 assert.equal(depth.a[0],depth.b[0]);assert.equal(depth.a[1],depth.b[1]);
 assert.equal(height.a[0],height.b[0]);assert.equal(height.a[2],height.b[2]);
 assert.equal(technicalView(product==='linea'?7.2:15.4),1,'Dimension shots must use parallel projection');
}
for(const t of [0,6.1,10,14.6,17.2,END])assert.equal(technicalView(t),0,'Other camera shots stay perspective');
assert.equal(detailOpacity(10,9.8,10.7),1);assert.equal(detailOpacity(9.8,9.8,10.7),0);assert.equal(detailOpacity(10.7,9.8,10.7),0);
assert(!html.includes('L${elbow}'),'Leader must be a single straight segment');
assert.equal(modelCopy(storyAt(7.2)).title,'LINEA');assert.equal(modelCopy(storyAt(8.5)).title,'FlexiShelf');
assert.equal(modelCopy(storyAt(16.3)).title,'3 adjustable heights');
for(const time of [17.5,17.9,18.3,18.9,19.3,21.4]){
 const state=storyAt(time);
 if(state.legFold>0)assert.equal(state.flip,1);
 if(state.halfFold>0)assert.equal(state.legFold,1);
 if(state.carry>0)assert.equal(state.latch,1);
}
assert.equal(storyAt(21.8).pack,1);
for(let t=0;t<=END;t+=.037){const a=storyAt(t);storyAt(END-t);assert.equal(JSON.stringify(storyAt(t)),JSON.stringify(a),'Reverse/jump state must not accumulate');for(const value of cameraAt(t))assert(Number.isFinite(value));}
const assets=new Set([...html.matchAll(/(?:src|href)="(assets\/[^"#?]+)"/g)].map(m=>m[1]));
assert.equal(assets.size,4);
for(const path of assets)await stat(new URL(path,root));
assert.deepEqual((await readdir(new URL('assets/',root))).sort(),[...assets].map(p=>p.split('/').pop()).sort(),'Unused or missing web assets');
assert.equal((html.match(/id="s[1-9]"/g)||[]).length,7);
assert(html.includes('$99.99')&&html.includes('$74.99'));
for(const [,code] of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new Script(code);
const readme=await readFile(new URL('README.md',root),'utf8');
for(const [,path] of readme.matchAll(/(?:src="|!\[[^\]]*\]\()(docs\/images\/[^"\s)]+)/g))await stat(new URL(path,root));
assert(!/id="hud"|class="card"/.test(html),'Remove HUD and side infographic cards');
console.log('PASS: 7 scenes; animated collection text and curtains; fallback caption transitions; reference-corner rulers; parallel measurement projection; live height values; straight fading leaders; Explore targets; shelf levels; ordered fold/pack; reverse/jump states; 4 image assets; prices; JavaScript syntax; README images.');
