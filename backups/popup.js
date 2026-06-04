/* ====== Fire alert · popup (collecting) → main screen ====== */
const TWEAKS = /*EDITMODE-BEGIN*/{
  "scenario": "own",
  "origin": "unit",
  "tone": "calm",
  "lang": "ko",
  "textSize": "l",
  "floor": 12
}/*EDITMODE-END*/;

const S = {
  ko: {
    htmlLang:'ko', unit:'층', en:f=>`${f}F · 본관`, unitNo:(f,n)=>`${f}${n}호`,
    mainStub:'메인 화면', respWait:'응답 대기',
    falseLabel:'오작동입니다 · 신고',
    reportedMsg:'관리실·소방에 ‘오작동(이상 없음)’으로 접수했어요. <small>담당자가 곳 확인합니다 · 접수 완료</small>',
    twOrigin:'발화 위치 · Fire origin', twOriginUnit:'세대 화재', twOriginHall:'복도 화재',
    checks:[
      {t:'감지기 신호 확인', m:'정상'},
      {t:'발생 위치 특정', m:ctx=>ctx.origin==='hallway'?`${ctx.f}층 복도`:`${ctx.fireUnit} · 주방`},
      {t:'발생 층 세대 응답 수집', m:'3 세대'},
      {t:'실제 화재 여부 교차 확인', m:'확인'}
    ],
    collectLbl:'상황 정보를 수집하고 있어요',
    collectSub:'잠시만 기다려 주세요 · 정리되면 전체 화면으로 바로 전환돼요',
    twScn:'보는 사람 · Who is viewing', twTone:'톤 · Tone', twLang:'언어 · Language', twFloor:'화재 발생 층 · Fire floor',
    twText:'글자 크기 · Text size', twTextM:'보통', twTextL:'크게', twTextXL:'아주 크게',
    twScnOwn:'내 집', twScnSame:'같은 층', twScnNear:'인접 층', twScnFar:'먼 층',
    twToneCalm:'차분', twToneUrgent:'긴박',
    scnNote:{ own:'내 집에서 경보 — 자동으로 대피 화면 전환', same:'같은 층 다른 호 — 자동으로 대피 화면 전환', near:'가까운 층 — 자동으로 대피 화면 전환', far:'멀리 떨어진 층 — 자동 전환 없음' },
    scn:{
      own:{
        status:'내 집 화재 경보', fast:true, autoOpen:true,
        say:ctx=>`내 집(${ctx.fireUnit})에서 화재 경보가 울렸습니다`,
        collectLbl:'내 집 경보 — 상황을 확인하고 있어요',
        collectSub:'연기가 보이면 기다리지 말고 먼저 대피하세요 · 곧 전체 화면으로 전환돼요',
        falseTxt:'정말 <b>불이 나지 않았나요?</b> 직접 확인했다면 지금 알려주세요.',
        falseBtn:'오작동입니다 · 신고',
        reported:'관리실·소방에 ‘오작동’으로 접수했어요. <small>담당자가 곧 확인합니다 · 접수번호 #FA-1204</small>'
      },
      same:{
        status:'우리 층 화재 경보', fast:true, autoOpen:true,
        say:ctx=>`같은 층 ${ctx.fireUnit}에서 화재 경보가 울렸습니다`,
        collectLbl:'우리 층 경보 — 상황을 확인하고 있어요',
        collectSub:'같은 층 다른 세대예요 · 복도로 연기가 번지기 전에 대피를 준비하세요',
        falseTxt:ctx=>`우리 집 <b>(${ctx.myUnit})</b>은 아직 괜찮나요? 확인되면 알려주세요.`,
        falseBtn:'우리 집 이상 없음 · 보고',
        reported:'‘우리 세대 이상 없음’으로 보고했어요. <small>대피 안내는 계속 진행됩니다 · 접수번호 #FA-1208</small>'
      },
      near:{
        status:'화재 경보 · 인접 층', autoOpen:true,
        say:'가까운 층에서 화재 경보가 울렸습니다',
        falseTxt:'우리 집 쪽은 <b>이상이 없나요?</b> 확인되면 알려주세요.',
        falseBtn:'이상 없음 · 보고',
        reported:'‘우리 세대 이상 없음’으로 보고했어요. <small>대피 안내는 계속 진행됩니다 · 접수번호 #FA-1410</small>'
      },
      far:{
        status:'화재 경보 · 먼 층', safe:true, autoOpen:false,
        say:'다른 층에서 화재 경보가 울렸습니다',
        falseBtn:'', falseTxt:'', reported:'',
        manualT:'메인 화면 열기', manualS:'현재 위치는 안전 범위예요 · 상황을 확인하세요'
      }
    }
  },
  en: {
    htmlLang:'en', unit:'F', en:f=>`Floor ${f} · Main`, unitNo:(f,n)=>`Unit ${f}${n}`,
    mainStub:'Main screen', respWait:'awaiting',
    falseLabel:'False alarm · report',
    reportedMsg:'Reported as a false alarm (all clear) to management & fire dept. <small>A staff member will verify shortly</small>',
    twOrigin:'Fire origin', twOriginUnit:'In a unit', twOriginHall:'Hallway',
    checks:[
      {t:'Verifying detector signal', m:'OK'},
      {t:'Pinpointing the location', m:ctx=>ctx.origin==='hallway'?`Floor ${ctx.f} hallway`:`${ctx.fireUnit} · kitchen`},
      {t:'Collecting same-floor replies', m:'3 homes'},
      {t:'Cross-checking if it is real', m:'done'}
    ],
    collectLbl:'Gathering the details for you',
    collectSub:'One moment — it switches to full screen automatically once ready',
    twScn:'Who is viewing', twTone:'Tone', twLang:'Language', twFloor:'Fire floor',
    twText:'Text size', twTextM:'Normal', twTextL:'Large', twTextXL:'X-Large',
    twScnOwn:'My unit', twScnSame:'Same floor', twScnNear:'Nearby', twScnFar:'Far floor',
    twToneCalm:'Calm', twToneUrgent:'Urgent',
    scnNote:{ own:'Alarm in your home — auto-switch to main screen', same:'Same floor, another unit — auto-switch to main screen', near:'Nearby floor — auto-switch to main screen', far:'Far floor — no auto-switch' },
    scn:{
      own:{
        status:'Fire alarm in your home', fast:true, autoOpen:true,
        say:ctx=>`A fire alarm went off in your home (${ctx.fireUnit})`,
        collectLbl:'Your home alarm — checking the situation',
        collectSub:'If you see smoke, don’t wait — evacuate. It switches to full screen shortly',
        falseTxt:'Is there really <b>no fire?</b> Tell us now if you’ve checked.',
        falseBtn:'False alarm · report',
        reported:'Reported as a false alarm to management & fire dept. <small>A staff member will verify shortly · ref #FA-1204</small>'
      },
      same:{
        status:'Fire alarm on your floor', fast:true, autoOpen:true,
        say:ctx=>`A fire alarm went off at ${ctx.fireUnit}, on your floor`,
        collectLbl:'Same-floor alarm — checking the situation',
        collectSub:'It’s another unit on your floor · prepare to evacuate before smoke spreads',
        falseTxt:ctx=>`Is your home <b>(${ctx.myUnit})</b> still clear? Let us know once checked.`,
        falseBtn:'My unit clear · report',
        reported:'Reported your unit as “all clear.” <small>Evacuation guidance continues · ref #FA-1208</small>'
      },
      near:{
        status:'Fire alarm · nearby floor', autoOpen:true,
        say:'A fire alarm went off on a nearby floor',
        falseTxt:'Is your home <b>all clear?</b> Let us know once checked.',
        falseBtn:'All clear · report',
        reported:'Reported your unit as “all clear.” <small>Evacuation guidance continues · ref #FA-1410</small>'
      },
      far:{
        status:'Fire alarm · far floor', safe:true, autoOpen:false,
        say:'A fire alarm went off on another floor',
        falseBtn:'', falseTxt:'', reported:'',
        manualT:'Open main screen', manualS:'You are within the safe range · review the status'
      }
    }
  }
};

const tr = () => S[TWEAKS.lang] || S.ko;
const scn = () => { const s = tr(); return s.scn[TWEAKS.scenario] || s.scn.near; };
const $ = id => document.getElementById(id);
const val = (x,ctx)=> typeof x==='function'? x(ctx): x;
function ctxOf(){
  const s=tr(), f=Number(TWEAKS.floor)||12, sc=TWEAKS.scenario;
  const off={own:0,same:0,near:2,far:-9}[sc]||0;
  const un={own:'04',same:'08',near:'10',far:'10'}[sc]||'10';
  const myFloor=Math.max(1,f+off);
  return { f, fireUnit:s.unitNo(f,'04'), myUnit:s.unitNo(myFloor,un), myFloor, origin:TWEAKS.origin||'unit' };
}
function canReport(){
  const sc=TWEAKS.scenario, o=TWEAKS.origin||'unit';
  if(sc==='near'||sc==='far') return false;          // adjacent / far: no report option
  return o==='unit' ? sc==='own' : (sc==='own'||sc==='same'); // unit fire → that unit only; hallway → whole floor
}

const scrim=$('scrim'), dash=$('dash'), checksEl=$('checks'),
      collectBar=$('collectBar'), collectPct=$('collectPct'),
      ready=$('ready'), falsebar=$('falsebar'), reported=$('reported');

const checkEls=[...checksEl.querySelectorAll('.chk')];

/* ---------- timeline model ---------- */
let timeline=null, reportedMode=false;
function buildTimeline(){
  const c=scn(), fast=!!c.fast;
  const k=fast?0.78:1, L=fast?340:520;
  const d0=380*k, d1=460*k, d3=1500*k;   // detector · location · cross-check (long)
  const noResp=2;                         // 발생 층 세대 응답 수집 — never resolves
  const e0=L+d0, e1=e0+d1, e3=e1+d3;
  const checkStart=[L,    e0,   e1,        e1 ];
  const checkDone =[e0,   e1,   Infinity,  e3 ];  // idx2 keeps loading; idx3 (cross-check) is the trigger
  const collectDone=e3;                   // = cross-check ("실제 화재 여부 교차 확인") done
  const openTime=c.autoOpen ? e3+360 : Infinity;  // TRIGGER: only the cross-check; ignores responses
  const Tend=c.autoOpen ? openTime+2600 : collectDone+1600;
  timeline={checkStart, checkDone, collectDone, openTime, Tend, n:checkEls.length, noResp};
}

function renderAt(t){
  const s=tr(), c=scn(), TL=timeline;
  reportedMode=false; reported.classList.remove('show');

  let triggerDone=0;
  const triggerTotal=TL.n-1;             // all checks except the no-response one
  checkEls.forEach((x,i)=>{
    let st='pending';
    if(t>=TL.checkDone[i]){ st='done'; }
    else if(t>=TL.checkStart[i]) st='checking';
    if(i!==TL.noResp && st==='done') triggerDone++;
    x.dataset.state=st;
    let metaTxt = st==='done' ? val(s.checks[i].m, ctxOf()) : '';
    if(i===TL.noResp && st==='checking') metaTxt=s.respWait;
    x.querySelector('.chk-meta').textContent = metaTxt;
  });
  collectBar.style.width=Math.round(triggerDone/triggerTotal*100)+'%';
  collectPct.textContent=Math.round(triggerDone/triggerTotal*100)+'%';

  const showMain = t>=TL.openTime;
  document.body.classList.toggle('dash-open', showMain);
  dash.setAttribute('aria-hidden', showMain?'false':'true');

  falsebar.hidden = !(canReport() && !showMain);
  if(!c.autoOpen && t>=TL.collectDone){
    $('expandT').textContent=c.manualT; $('expandS').textContent=c.manualS; ready.hidden=false;
  } else ready.hidden=true;
}

/* ---------- scrubber + playback ---------- */
const scrubber=$('scrubber'), scPlay=$('scPlay'), scTrack=$('scTrack'),
      scFill=$('scFill'), scHandle=$('scHandle'), scTime=$('scTime');
let currentT=0, playing=false, rafId=null, lastTs=0, dragging=false;

const fmt=ms=>{ const t=Math.max(0,Math.round(ms/1000)); return Math.floor(t/60)+':'+String(t%60).padStart(2,'0'); };
function updateScrubUI(){
  const p = timeline.Tend ? Math.min(1,currentT/timeline.Tend) : 0;
  scFill.style.width=(p*100)+'%'; scHandle.style.left=(p*100)+'%';
  scTime.textContent = fmt(currentT)+' / '+fmt(timeline.Tend);
  scrubber.classList.toggle('playing', playing);
}
function tick(ts){
  if(!playing) return;
  currentT=Math.min(timeline.Tend, currentT+(ts-lastTs)); lastTs=ts;
  renderAt(currentT); updateScrubUI();
  if(currentT>=timeline.Tend){ playing=false; updateScrubUI(); return; }
  rafId=requestAnimationFrame(tick);
}
function play(){ if(currentT>=timeline.Tend) currentT=0; playing=true; lastTs=performance.now(); updateScrubUI(); rafId=requestAnimationFrame(tick); }
function pause(){ playing=false; if(rafId) cancelAnimationFrame(rafId); updateScrubUI(); }
function seek(t){ pause(); currentT=Math.max(0,Math.min(timeline.Tend,t)); renderAt(currentT); updateScrubUI(); }
function restart(){ buildTimeline(); currentT=0; renderAt(0); updateScrubUI(); play(); }

scPlay.addEventListener('click', ()=>{ playing?pause():play(); });
$('scRestart').addEventListener('click', restart);
const trackToT=cx=>{ const r=scTrack.getBoundingClientRect(); return Math.max(0,Math.min(1,(cx-r.left)/r.width))*timeline.Tend; };
scTrack.addEventListener('pointerdown', e=>{ dragging=true; scrubber.classList.add('dragging'); try{scTrack.setPointerCapture(e.pointerId);}catch(_){} seek(trackToT(e.clientX)); });
scTrack.addEventListener('pointermove', e=>{ if(dragging) seek(trackToT(e.clientX)); });
const endDrag=()=>{ dragging=false; scrubber.classList.remove('dragging'); };
scTrack.addEventListener('pointerup', endDrag);
scTrack.addEventListener('pointercancel', endDrag);

/* ---------- false-alarm report ---------- */
$('falseBtn').addEventListener('click', ()=>{
  const c=scn(); pause(); reportedMode=true;
  falsebar.hidden=true; ready.hidden=true;
  document.body.classList.remove('dash-open'); dash.setAttribute('aria-hidden','true');
  reported.querySelector('.rtxt').innerHTML=tr().reportedMsg; reported.classList.add('show');
  requestAnimationFrame(()=>{ try{ scrim.scrollTo({top:scrim.scrollHeight, behavior:'smooth'}); }catch(e){ scrim.scrollTop=scrim.scrollHeight; } });
});

/* ---------- far: manual open ---------- */
$('expandBtn').addEventListener('click', ()=>{
  pause();
  document.body.classList.add('dash-open'); dash.setAttribute('aria-hidden','false');
});

/* ---------- keyboard ---------- */
window.addEventListener('keydown', e=>{
  if(e.key===' '||e.code==='Space'){ e.preventDefault(); playing?pause():play(); }
  else if(e.key==='ArrowRight'){ seek(currentT+2000); }
  else if(e.key==='ArrowLeft'){ seek(currentT-2000); }
});

/* ---------- contextual copy (scenario × origin) ---------- */
function copyFor(){
  const L = tr().htmlLang==='ko';
  const sc=TWEAKS.scenario, hall=(TWEAKS.origin||'unit')==='hallway', x=ctxOf(), f=x.f, U=x.fireUnit;
  const genLbl = L?'상황 정보를 수집하고 있어요':'Gathering the details for you';
  const genSub = L?'잠시만 기다려 주세요 · 정리되면 전체 화면으로 바로 전환돼요':'One moment — it switches to full screen automatically once ready';
  if(sc==='near') return {
    status:L?'화재 경보 · 인접 층':'Fire alarm · nearby floor',
    say: hall ? (L?'가까운 층 복도에서 화재 경보가 울렸습니다':'A fire alarm went off in a nearby-floor hallway')
              : (L?'가까운 층에서 화재 경보가 울렸습니다':'A fire alarm went off on a nearby floor'),
    lbl:genLbl, sub:genSub };
  if(sc==='far') return {
    status:L?'화재 경보 · 먼 층':'Fire alarm · far floor',
    say: hall ? (L?'다른 층 복도에서 화재 경보가 울렸습니다':"A fire alarm went off in another floor's hallway")
              : (L?'다른 층에서 화재 경보가 울렸습니다':'A fire alarm went off on another floor'),
    lbl:genLbl, sub:genSub };
  // own / same
  if(hall) return {
    status:L?'우리 층 화재 경보':'Fire alarm on your floor',
    say:L?`우리 층(${f}층) 복도에서 화재 경보가 울렸습니다`:`A fire alarm went off in your floor-${f} hallway`,
    lbl:L?'우리 층 경보 — 상황을 확인하고 있어요':'Same-floor alarm — checking the situation',
    sub:L?'복도에서 울린 경보예요 · 연기가 번지기 전에 대피를 준비하세요':'Alarm from the hallway · prepare to evacuate before smoke spreads' };
  if(sc==='own') return {
    status:L?'내 집 화재 경보':'Fire alarm in your home',
    say:L?`내 집(${U})에서 화재 경보가 울렸습니다`:`A fire alarm went off in your home (${U})`,
    lbl:L?'내 집 경보 — 상황을 확인하고 있어요':'Your home alarm — checking the situation',
    sub:L?'연기가 보이면 기다리지 말고 먼저 대피하세요 · 곧 전체 화면으로 전환돼요':'If you see smoke, don’t wait — evacuate. It switches to full screen shortly' };
  return { // same · unit fire
    status:L?'우리 층 화재 경보':'Fire alarm on your floor',
    say:L?`같은 층 ${U}에서 화재 경보가 울렸습니다`:`A fire alarm went off at ${U}, on your floor`,
    lbl:L?'우리 층 경보 — 상황을 확인하고 있어요':'Same-floor alarm — checking the situation',
    sub:L?'같은 층 다른 세대예요 · 복도로 연기가 번지기 전에 대피를 준비하세요':'It’s another unit on your floor · prepare to evacuate before smoke spreads' };
}

/* ---------- apply everything ---------- */
function applyTweaks(){
  const s=tr(), c=scn(), f=Number(TWEAKS.floor)||12;
  document.documentElement.lang=s.htmlLang;
  document.body.className=`tone-${TWEAKS.tone} scn-${TWEAKS.scenario} tsize-${TWEAKS.textSize||'l'}`+
    (document.body.classList.contains('dash-open')?' dash-open':'')+
    (c.safe?' dash-safe':'');

  const cp=copyFor();
  $('floorNum').textContent=f; $('floorUnit').textContent=s.unit; $('floorEn').textContent=s.en(f);
  $('statusTxt').textContent=cp.status;
  $('hdrSay').textContent=cp.say;
  $('collectLbl').textContent=cp.lbl;
  $('collectSub').textContent=cp.sub;
  [...checksEl.querySelectorAll('.chk .chk-txt')].forEach((el,i)=>{ if(s.checks[i]) el.textContent=s.checks[i].t; });

  $('falseBtnTxt').textContent = canReport()? s.falseLabel : '';
  // people who can report ARE the same-floor response source — hide the "collecting responses" row for them
  if(checkEls[2]) checkEls[2].style.display = canReport()? 'none' : '';

  $('mainStubTxt').textContent=s.mainStub;

  $('twScnLbl').textContent=s.twScn; $('twLangLbl').textContent=s.twLang; $('twFloorLbl').textContent=s.twFloor;
  $('twOriginLbl').textContent=s.twOrigin;
  $('twScnNote').textContent=s.scnNote[TWEAKS.scenario]||'';
  document.querySelectorAll('[data-i18n]').forEach(el=>{ const k=el.dataset.i18n; if(s[k]) el.textContent=s[k]; });
}

/* ---------- init ---------- */
buildTimeline();
applyTweaks();
renderAt(0); updateScrubUI();
play();

/* ---------- Tweaks protocol ---------- */
const tweaksEl=$('tweaks'), twFloor=$('twFloor'), twSegs=tweaksEl.querySelectorAll('.tw-seg');
function syncTweaksUI(){
  twSegs.forEach(seg=>{ const k=seg.dataset.tweak;
    seg.querySelectorAll('button').forEach(b=>b.classList.toggle('on', b.dataset.value===String(TWEAKS[k]))); });
  twFloor.value=TWEAKS.floor;
}
syncTweaksUI();
function persist(edits){
  Object.assign(TWEAKS, edits);
  window.parent.postMessage({type:'__edit_mode_set_keys', edits}, '*');
  applyTweaks(); syncTweaksUI();
  if('scenario' in edits){ restart(); }
  else { buildTimeline(); currentT=Math.min(currentT, timeline.Tend); renderAt(currentT); updateScrubUI(); }
}
twSegs.forEach(seg=>seg.addEventListener('click', e=>{
  const b=e.target.closest('button[data-value]'); if(!b) return;
  persist({[seg.dataset.tweak]: b.dataset.value});
}));
twFloor.addEventListener('input', ()=>persist({floor:Math.max(1,Math.min(99,Number(twFloor.value)||1))}));

window.addEventListener('message', e=>{
  const d=e&&e.data; if(!d||!d.type) return;
  if(d.type==='__activate_edit_mode')   tweaksEl.classList.add('visible');
  if(d.type==='__deactivate_edit_mode') tweaksEl.classList.remove('visible');
});
window.parent.postMessage({type:'__edit_mode_available'}, '*');
$('twClose').addEventListener('click', ()=>{ tweaksEl.classList.remove('visible'); window.parent.postMessage({type:'__edit_mode_dismissed'},'*'); });

// standalone mode: show a Tweaks toggle button when not inside a host frame
if(window.parent===window){
  const tb=document.createElement('button');
  tb.textContent='⚙ Tweaks';
  tb.style.cssText='position:fixed;bottom:56px;right:14px;z-index:70;font-family:inherit;font-size:13px;font-weight:750;color:#fff;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.20);padding:8px 16px;border-radius:999px;cursor:pointer;backdrop-filter:blur(8px);letter-spacing:-.01em';
  tb.addEventListener('click',()=>tweaksEl.classList.toggle('visible'));
  document.body.appendChild(tb);
}
