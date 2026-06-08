/* ====== Fire alert · popup (collecting) → main screen · v5 (5-axis) ======
   축1 proximity (A~F) × 축2 origin (6) × 축3 verify (4) × 축4 evidence (5) × 축5 persona (7)
   → directive(행동 프레임) 파생 → 팝업 카피/동작 매핑
*/
const TWEAKS = /*EDITMODE-BEGIN*/{
  "proximity": "C",
  "origin": "unit",
  "verdict": "real",
  "evidence": "none",
  "persona": "adult",
  "lang": "ko",
  "floor": 12
}/*EDITMODE-END*/;

/* ---------- bilingual dictionaries ---------- */
const DICT = {
  ko: {
    htmlLang:'ko', unit:'층', en:f=>`101동`,
    mainStub:'메인 화면', respWait:'응답 대기',
    // 근접 계층 — 보는 사람 기준 방향 (바로 위/아래만 특정, 나머지는 위/아래)
    prox:{ A:'우리 집', B:'같은 층', C:'바로 위층', D:'바로 아래층', E:'위층', F:'아래층' },
    proxNote:{
      A:'자기 세대 화재 — 직접 경험, 응답 시간 임계',
      B:'이웃·복도·계단 — 대피로 차단 주의',
      C:'★ 연기 상승 첫 접점 — 조기 대피 기본',
      D:'상대적 안전 — 실내 대기 기본, 연기 하강 감시',
      E:'간접 정보 — 월패드 안내 의존',
      F:'가장 안전 — 실내 대기가 거의 항상 최선'
    },
    // 발화 위치 (상대/절대)
    originRel:{ unit:'세대', hallway:'복도', stairs:'계단실' },
    loc:{ parking:'지하주차장', lobby:'저층 공용부', rooftop:'옥상·기계실', myhome:'우리 집' },
    // 검증 진행 단계(시간 의존) — 배지/헤드라인 단어
    phaseShort:{ T0:'화재 의심', T1:'화재 경보', real:'화재 확인', false:'경보 확인 중' },
    // 헤드라인 (phase 별)
    say:(p,loc)=>({
      T0:`${loc}에서 화재가 의심됩니다`,
      T1:`${loc}에서 화재 경보가 울렸습니다`,
      real:`${loc} 화재가 실제로 확인되었습니다`,
      false:`${loc} 경보를 확인하고 있습니다`
    }[p]),
    verdictNote:{ real:'교차 확인이 실제 화재로 결론 — 대피 화면 전환', false:'교차 확인이 오작동으로 결론 — “경보 확인 중” 유지' },
    // 수집 라벨
    collectLbl:'상황 정보를 수집하고 있어요',
    collectDoneLbl:'확인 완료',
    stepWord:'확인',
    // directive 안내문 (a: 행동 hero, w: 이유/보조 — 작게)
    dir:{
      evac_now:{a:'지금 즉시 대피하세요', w:''},
      evac_early:{a:'지금 대피를 준비하세요', w:'연기는 위로 올라옵니다'},
      route_blocked:{a:'현관문을 열지 마세요', w:'창문 쪽 방으로 이동하세요'},
      stay:{a:'실내에서 대기하세요', w:'연기 유입을 지켜보세요'},
      suppress:{a:'초기 진화 또는 즉시 대피', w:'불길이 크면 바로 대피하세요'},
      evac_dark:{a:'바닥에 엎드려 대피하세요', w:'벽을 짚고 대피로로'},
      door_check:{a:'현관문부터 확인하세요', w:'손등으로 대고 뜨거우면 열지 마세요'}
    },
    // 메인 화면 스텁
    stub:{
      evac_now:'지금 대피하세요', evac_early:'지금 대피 준비',
      route_blocked:'문 닫고 창문 쪽으로', stay:'실내 대기',
      suppress:'초기 진화 또는 대피', evac_dark:'벽 짚고 대피',
      door_check:'현관문 확인 후 판단'
    },
    // 직접 증거 escalation
    ev:{
      smell:'타는 냄새가 나면 기다리지 말고 대피를 준비하세요',
      smoke:'연기가 보입니다 · 확인 없이 지금 대피하세요',
      fire:'열기·화염이 있습니다 · 즉시 대피하세요',
      blackout:'정전·시야 차단 · 벽을 짚고 이동하거나 구조를 기다리세요'
    },
    // T2-오작동 가드 오버레이
    guard:'오작동은 안전을 뜻하지 않습니다. 연기·냄새가 나면 즉시 대피하고, 재경보가 울리면 실제 화재로 대응하세요.',
    // 페르소나 안내
    persona:{
      elder:'<b>노인</b> · 천천히, 난간을 꼭 잡고, 층마다 쉬어가며',
      child:'<b>어린이</b> · 먼저 보호자에게 전화하세요',
      infant:'<b>영유아 동반</b> · 아기만 안고 30초 안에 · 유모차 금지',
      pregnant:'<b>임산부</b> · 배를 보호하며 천천히 · 완강기 금지',
      wheelchair:'<b>지체장애</b> · 계단 대신 완강기 또는 구조 대기',
      sensory:'<b>시각/청각/거동</b> · 음성·진동 안내를 따르고 구조 우선'
    },
    // 보고 버튼
    falseSelf:'오작동입니다 · 신고',
    falseNeighbor:'우리 집 이상 없음 · 보고',
    reportedSelf:'관리실·소방에 ‘오작동(이상 없음)’으로 접수했어요. <small>담당자가 곧 확인합니다 · 접수 완료</small>',
    reportedNeighbor:'‘우리 세대 이상 없음’으로 보고했어요. <small>대피 안내는 계속 진행됩니다 · 접수 완료</small>',
    // 메인 화면 수동 열기
    manualT:'메인 화면 열기', manualS:'현재 위치는 대피 대상이 아니에요 · 상황을 확인하세요',
    manualMonitorT:'감시 화면 열기', manualMonitorS:'오작동으로 보이지만 감시는 계속돼요 · 연기·냄새 시 즉시 대피',
    // 체크리스트
    checks:['감지기 신호 확인','발생 위치 확인','발생 층 상황 확인','관리실에서 상황 확인'],
    metaOK:'정상', metaUnits:'3 세대', metaReal:'실화 확인', metaFalse:'오작동 판정', checkingMgmt:'확인 중'
  },
  en: {
    htmlLang:'en', unit:'F', en:f=>`Bldg 101`,
    mainStub:'Main screen', respWait:'awaiting',
    prox:{ A:'Your home', B:'Same floor', C:'Right above', D:'Right below', E:'Above you', F:'Below you' },
    proxNote:{
      A:'Fire in your own home — direct, response time critical',
      B:'Neighbor / hallway / stairs — watch for blocked exits',
      C:'★ First point smoke reaches — evacuate early',
      D:'Relatively safe — stay inside, watch for descending smoke',
      E:'Indirect info — rely on wall-pad guidance',
      F:'Safest — staying inside is almost always best'
    },
    originRel:{ unit:'unit', hallway:'hallway', stairs:'stairwell' },
    loc:{ parking:'the parking garage', lobby:'the lobby', rooftop:'the rooftop', myhome:'your home' },
    phaseShort:{ T0:'Possible fire', T1:'Fire alarm', real:'Fire confirmed', false:'Verifying alarm' },
    say:(p,loc)=>({
      T0:`A possible fire in ${loc}`,
      T1:`A fire alarm went off in ${loc}`,
      real:`A real fire is confirmed in ${loc}`,
      false:`Verifying the alarm in ${loc}`
    }[p]),
    verdictNote:{ real:'Cross-check concludes a real fire — switches to evacuation', false:'Cross-check concludes a false alarm — stays “verifying”' },
    collectLbl:'Gathering the details for you',
    collectDoneLbl:'Checks complete',
    stepWord:'checked',
    dir:{
      evac_now:{a:'Evacuate now', w:''},
      evac_early:{a:'Prepare to evacuate now', w:'Smoke rises upward'},
      route_blocked:{a:'Don’t open your door', w:'Move to a window-side room'},
      stay:{a:'Stay inside', w:'Watch for smoke coming in'},
      suppress:{a:'Suppress it or evacuate', w:'If flames grow, get out now'},
      evac_dark:{a:'Stay low and evacuate', w:'Follow the wall to the exit'},
      door_check:{a:'Check your door first', w:'If hot to the touch, don’t open'}
    },
    stub:{
      evac_now:'Evacuate now', evac_early:'Prepare to evacuate',
      route_blocked:'Close door, go window-side', stay:'Stay inside',
      suppress:'Suppress or evacuate', evac_dark:'Stay low, evacuate',
      door_check:'Check door, then decide'
    },
    ev:{
      smell:'If you smell burning, don’t wait — prepare to evacuate',
      smoke:'Smoke is visible · evacuate now without checking',
      fire:'Heat / flames present · evacuate immediately',
      blackout:'Power out, no visibility · follow the wall or wait for rescue'
    },
    guard:'A false alarm doesn’t mean safe. Evacuate if you smell or see smoke, and treat any re-alarm as a real fire.',
    persona:{
      elder:'<b>Older adult</b> · slow, hold the rail, rest each floor',
      child:'<b>Child</b> · call a guardian first',
      infant:'<b>With infant</b> · carry the baby, out in 30s · no stroller',
      pregnant:'<b>Pregnant</b> · slow, protect your belly · no descent device',
      wheelchair:'<b>Mobility</b> · use a descent device or wait for rescue',
      sensory:'<b>Vision/hearing</b> · follow voice & vibration, rescue first'
    },
    falseSelf:'False alarm · report',
    falseNeighbor:'My unit is clear · report',
    reportedSelf:'Reported as a false alarm (all clear) to management & fire dept. <small>A staff member will verify shortly</small>',
    reportedNeighbor:'Reported your unit as “all clear.” <small>Evacuation guidance continues</small>',
    manualT:'Open main screen', manualS:'Your location isn’t being evacuated · review the status',
    manualMonitorT:'Open monitor screen', manualMonitorS:'Looks like a false alarm, but monitoring continues · evacuate if you smell/see smoke',
    checks:['Verifying detector signal','Confirming the location','Checking the affected floor','Management confirming the situation'],
    metaOK:'OK', metaUnits:'3 homes', metaReal:'real', metaFalse:'false alarm', checkingMgmt:'confirming'
  }
};

/* ---------- helpers ---------- */
const $ = id => document.getElementById(id);
const L = () => DICT[TWEAKS.lang] || DICT.ko;

// 발화 위치 문구 (절대 위치 3종 + 상대 위치 3종)
function locPhrase(){
  const s=L(), {proximity:p, origin:o} = TWEAKS;
  if(o==='parking') return s.loc.parking;
  if(o==='lobby')   return s.loc.lobby;
  if(o==='rooftop') return s.loc.rooftop;
  if(p==='A')       return s.loc.myhome;          // A는 세대내부만 (유효성)
  return `${s.prox[p]} ${s.originRel[o]}`;         // 예: 바로 위층 복도
}

// ★ 핵심 파생: directive (행동 프레임)
function deriveDirective(){
  const {proximity:p, origin:o, evidence:e, verdict} = TWEAKS;
  if(e==='blackout') return 'evac_dark';                 // 정전+시야0
  if(e==='smoke' || e==='fire') return 'evac_now';       // 직접 증거 최우선(가드레일 2)
  if(o==='parking'){                                     // 지하주차장 = 연기 급속 상승
    return (p==='B'||p==='C'||p==='D') ? 'evac_now' : 'stay';
  }
  if(o==='hallway' || o==='stairs'){                     // 복도·계단 = 대피로 차단
    return (p==='A'||p==='B'||p==='C') ? 'route_blocked' : 'stay';
  }
  if(o==='rooftop' || o==='lobby'){                      // 옥상·저층공용부
    return (p==='B'||p==='C'||(o==='rooftop'&&p==='E')||(o==='lobby'&&p==='F')) ? 'route_blocked' : 'stay';
  }
  // origin = unit (세대내부)
  if(p==='A') return 'suppress';
  if(p==='C') return 'evac_early';
  if(p==='E') return verdict==='real' ? 'evac_early' : 'stay'; // 위층 + 실화 확인 → 조기 대피
  if(p==='B') return 'door_check';
  return 'stay';   // D/F
}

// 보고 권한: 발화 현장을 직접 목격 가능한 위치만 (보고 권한 매트릭스 단순화)
function canReport(){
  const {proximity:p, origin:o} = TWEAKS;
  if(p==='A') return true;            // 당사자 → 오작동 신고
  if(p==='B') return o==='hallway';   // 같은 층 → 복도(공용부) 화재일 때만 '우리 세대 이상 없음' 보고
  return false;                        // 세대 내부 화재의 이웃 등 → 보고 버튼 없음
}

// 전체 상태 파생 (시간 무관 부분만. 검증 단계 T0→T1→판정은 renderAt에서 시간별로)
function derive(){
  const s=L(), verdict=TWEAKS.verdict, e=TWEAKS.evidence;
  const directive = deriveDirective();
  const calm = (e==='none'||e==='smell') && (directive==='stay' || verdict==='false');
  const di = s.dir[directive];
  const why = (e!=='none' && s.ev[e]) ? s.ev[e] : di.w;   // 직접 증거가 있으면 그 경고가 우선
  return {
    directive,
    tone: 'calm',
    action: di.a,
    why,
    stub: s.stub[directive],
    autoOpen: true,   // 확인 완료 시 항상 자동 전환 (실내 대기·오작동 포함)
    fast: directive !== 'stay',
    canReport: canReport(),
    textSize: 'l'
  };
}

/* ---------- DOM refs ---------- */
const scrim=$('scrim'), dash=$('dash'), checksEl=$('checks'),
      ready=$('ready'), falsebar=$('falsebar'), reported=$('reported');
const stepSegs=[];
const checkEls=[...checksEl.querySelectorAll('.chk')];

/* ---------- timeline model ---------- */
let timeline=null;
function buildTimeline(){
  const d=derive(), fast=d.fast;
  const k=fast?0.78:1, B=fast?340:520;
  const d0=380*k, d1=460*k, d3=1500*k;
  const e0=B+d0, e1=e0+d1, e3=e1+d3;
  const checkStart=[B,   e0,  e1,        e1];
  const checkDone =[e0,  e1,  Infinity,  e3];   // idx2 = 응답 수집(미완), idx3 = 교차 확인(트리거)
  const collectDone=e3;
  const openTime=d.autoOpen ? e3+360 : Infinity;
  const Tend=d.autoOpen ? openTime+2600 : collectDone+2200;   // 오작동/실내대기 → 판정 끝상태가 숨 쉰도록
  timeline={checkStart, checkDone, collectDone, openTime, Tend, n:checkEls.length, noResp:2};
}

function renderAt(t){
  const s=L(), d=derive(), TL=timeline, verdict=TWEAKS.verdict;
  reported.classList.remove('show');

  // 검증 진행 단계 (시간이 흐르며 팔업이 스스로 알아냄)
  //  위치 특정 전 = 의심(T0) · 교차 확인 전 = 경보(T1) · 교차 확인 후 = 판정(실화/오작동)
  const phase = t < TL.checkDone[1] ? 'T0' : (t < TL.collectDone ? 'T1' : verdict);
  $('statusTxt').textContent = s.phaseShort[phase];
  $('hdrSay').textContent = s.say(phase, locPhrase());
  const showGuard = (phase==='false');   // 오작동 판정 순간부터 “오작동≠안전” 가드
  const gl=$('guardLine'); gl.textContent = showGuard ? s.guard : ''; gl.hidden = !showGuard;

  let triggerDone=0; const triggerTotal=TL.n-1;
  checkEls.forEach((x,i)=>{
    let st='pending';
    if(t>=TL.checkDone[i]) st='done';
    else if(t>=TL.checkStart[i]) st='checking';
    if(i!==TL.noResp && st==='done') triggerDone++;
    x.dataset.state=st;
    let meta='';
    if(st==='done'){
      const verdictMeta = verdict==='real' ? s.metaReal : s.metaFalse;
      meta=[s.metaOK, locPhrase(), s.metaUnits, verdictMeta][i];
    }
    if(i===TL.noResp && st==='checking') meta=s.respWait;
    if(i===3 && st==='checking') meta=s.checkingMgmt;   // 교차 확인 = 관리실 쪽 작업
    x.querySelector('.chk-meta').textContent=meta;
  });
  // 체크리스트가 진행을 전담 (텍스트 라벨 없음)

  const showMain = t>=TL.openTime;
  document.body.classList.toggle('dash-open', showMain);
  dash.setAttribute('aria-hidden', showMain?'false':'true');

  falsebar.hidden = !(d.canReport && !showMain);
  ready.hidden=true;   // autoOpen=true라 수동 버튼 항상 숨김
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

/* ---------- report ---------- */
$('falseBtn').addEventListener('click', ()=>{
  const s=L(); pause();
  falsebar.hidden=true; ready.hidden=true;
  document.body.classList.remove('dash-open'); dash.setAttribute('aria-hidden','true');
  reported.querySelector('.rtxt').innerHTML = TWEAKS.proximity==='A' ? s.reportedSelf : s.reportedNeighbor;
  reported.classList.add('show');
  requestAnimationFrame(()=>{ try{ scrim.scrollTo({top:scrim.scrollHeight, behavior:'smooth'}); }catch(e){ scrim.scrollTop=scrim.scrollHeight; } });
});
$('expandBtn').addEventListener('click', ()=>{
  pause(); document.body.classList.add('dash-open'); dash.setAttribute('aria-hidden','false');
});

/* ---------- keyboard ---------- */
window.addEventListener('keydown', e=>{
  if(e.key===' '||e.code==='Space'){ e.preventDefault(); playing?pause():play(); }
  else if(e.key==='ArrowRight'){ seek(currentT+2000); }
  else if(e.key==='ArrowLeft'){ seek(currentT-2000); }
});

// 모순 감지 — 체계적 룰
function detectIncompat(){
  const {proximity:p, origin:o, verdict:v, evidence:e} = TWEAKS;
  // [A] 건물-절대위치(계단실·주차장·저층공용부·옥상) = 층/방향 개념 없음 → 어떤 근접과도 모순
  if(['stairs','parking','lobby','rooftop'].includes(o)) return true;
  // [B] 복도 + 당사자(A) → 복도는 우리 집이 아님
  if(o==='hallway' && p==='A') return true;
  // [C] 연기·화염 목격 + 오작동 판정 → 감각 vs 시스템 정면충돌
  if((e==='smoke'||e==='fire') && v==='false') return true;
  // [D] 화염 직접 목격 + 먼 세대(D/E/F) + 세대내부 → 남의 집 불꽃을 직접 볼 수 없음
  if(e==='fire' && ['D','E','F'].includes(p) && o==='unit') return true;
  return false;
}

function updateIncompat(){
  document.getElementById('incompatBanner').classList.toggle('show', detectIncompat());
}
function applyTweaks(){
  const s=L(), d=derive(), f=Number(TWEAKS.floor)||12;
  document.documentElement.lang=s.htmlLang;
  document.body.className=`prox-${TWEAKS.proximity} tsize-${d.textSize}`+
    (document.body.classList.contains('dash-open')?' dash-open':'');

  $('floorNum').textContent=f; $('floorUnit').textContent=s.unit; $('floorEn').textContent=s.prox[TWEAKS.proximity];
  $('actLine').textContent=d.action;

  $('personaChip').hidden=true;   // 페르소나는 팝업이 아닌 메인 대피 화면에서 반영
  // 상태 배지·헤드라인·오작동 가드는 renderAt(t)가 시간별로 갱신

  [...checksEl.querySelectorAll('.chk .chk-txt')].forEach((el,i)=>{ if(s.checks[i]) el.textContent=s.checks[i]; });
  $('falseBtnTxt').textContent = d.canReport ? (TWEAKS.proximity==='A'?s.falseSelf:s.falseNeighbor) : '';
  // 같은 층 응답을 보고할 사람 = idx2 응답 소스 본인 → 해당 행 숨김
  if(checkEls[2]) checkEls[2].style.display = d.canReport ? 'none' : '';

  $('mainStubTxt').textContent=d.stub || s.mainStub;
  $('twProxNote') && ($('twProxNote').hidden=true);
  $('twVerdictNote') && ($('twVerdictNote').hidden=true);
}

/* ---------- init ---------- */
buildTimeline(); applyTweaks(); renderAt(0); updateScrubUI(); updateIncompat(); play();

/* ---------- Tweaks protocol ---------- */
const tweaksEl=$('tweaks'), twFloor=$('twFloor'), twSegs=tweaksEl.querySelectorAll('.tw-seg');
function syncTweaksUI(){
  twSegs.forEach(seg=>{ const k=seg.dataset.tweak;
    seg.querySelectorAll('button').forEach(b=>b.classList.toggle('on', b.dataset.value===String(TWEAKS[k]))); });
  twFloor.value=TWEAKS.floor;
  // 유효성 잠금 제거 — 모순은 인컴팯 배너로만 알림
  tweaksEl.querySelectorAll('[data-tweak="origin"] button').forEach(b=>{ b.disabled=false; });
}
syncTweaksUI();

function persist(edits){
  const flowKeys=['proximity','origin','verdict','evidence','persona'];
  const flowChanged = flowKeys.some(k=>k in edits);
  Object.assign(TWEAKS, edits);
  window.parent.postMessage({type:'__edit_mode_set_keys', edits}, '*');
  applyTweaks(); syncTweaksUI(); updateIncompat();
  if(flowChanged){ restart(); }
  else { buildTimeline(); currentT=Math.min(currentT, timeline.Tend); renderAt(currentT); updateScrubUI(); }
}
twSegs.forEach(seg=>seg.addEventListener('click', e=>{
  const b=e.target.closest('button[data-value]'); if(!b || b.disabled) return;
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

// standalone: Tweaks 토글 버튼
if(window.parent===window){
  const tb=document.createElement('button');
  tb.textContent='⚙ Tweaks';
  tb.style.cssText='position:fixed;bottom:56px;right:14px;z-index:70;font-family:inherit;font-size:13px;font-weight:750;color:#fff;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.20);padding:8px 16px;border-radius:999px;cursor:pointer;backdrop-filter:blur(8px);letter-spacing:-.01em';
  tb.addEventListener('click',()=>tweaksEl.classList.toggle('visible'));
  document.body.appendChild(tb);
}
