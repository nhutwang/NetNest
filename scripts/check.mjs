import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {Script,runInNewContext} from 'node:vm';

const root=new URL('../',import.meta.url);
const bytes=await readFile(new URL('index.html',root));
const html=bytes.toString('utf8');
const stateSource=html.match(/\/\* STORY_STATE_START \*\/([\s\S]*?)\/\* STORY_STATE_END \*\//);
assert(stateSource,'Missing deterministic story state for PDF fixes');
const {storyAt,cameraAt,dimensionOpacity,modelCopy,presentationAt,detailOpacity,technicalRulers,technicalView,STORY_TARGETS,END}=runInNewContext(stateSource[1]+';({storyAt,cameraAt,dimensionOpacity,modelCopy,presentationAt,detailOpacity,technicalRulers,technicalView,STORY_TARGETS,END})');
for(const [name,chapter] of [['top',1],['collections',3],['linea',4],['roam',6]])assert.equal(storyAt(STORY_TARGETS[name]).chapter,chapter,'Explore target must resolve to its intended chapter');
assert.equal(storyAt(2.7).chapter,2);assert.equal(storyAt(4.55).chapter,3);
assert(!html.includes('~2.10M')&&!html.includes('~2.22M'),'Remove market scene per new PDF');
assert(html.includes('Our vision')&&html.includes('A Vietnamese word for a distinctive line'),'Brand meaning and vision are required');
assert(html.includes('data-story-target="linea"')&&html.includes('data-story-target="roam"'),'Explore must navigate to both products');
assert.equal(storyAt(0).chapter,1);assert.equal(storyAt(END).chapter,7);
for(const [start,end] of [[.78,2.44],[2.45,4.29],[4.3,6.69],[21.9,END]]){
 let previous=0;
 for(let t=start;t<end;t+=.002){const visible=presentationAt(t).contentOpacity;assert(visible>=previous-1e-12,'A new scene must fade in once, never flash and fade before appearing');previous=visible;}
 assert.equal(presentationAt(end).contentOpacity,1,'Scene must remain fully visible through the hold');
}
assert.equal(presentationAt(.78).contentOpacity,0);
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
assert.equal(assets.size,6);
for(const path of assets)await stat(new URL(path,root));
assert.deepEqual((await readdir(new URL('assets/',root))).sort(),[...assets].map(p=>p.split('/').pop()).sort(),'Unused or missing web assets');
assert.equal((html.match(/id="s[1-9]"/g)||[]).length,7);
assert(html.includes('$99.99')&&html.includes('$74.99'));
for(const [,code] of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new Script(code);
const readme=await readFile(new URL('README.md',root),'utf8');
for(const [,path] of readme.matchAll(/(?:src="|!\[[^\]]*\]\()(docs\/images\/[^"\s)]+)/g))await stat(new URL(path,root));
assert(!/id="hud"|class="card"/.test(html),'Remove HUD and side infographic cards');
console.log('PASS: 7 scenes; single monotonic scene reveals; reference-corner rulers; parallel measurement projection; live height values; straight fading leaders; brand/vision/collections; Explore targets; shelf levels; ordered fold/pack; reverse/jump states; 6 image assets; prices; JavaScript syntax; README images.');
