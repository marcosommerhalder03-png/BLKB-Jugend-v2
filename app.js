var state={xp:205,streak:1,sparGuthaben:2500,kontoGuthaben:1247.50,goals:[],haxxDone:[],badges:[],kapitelDone:[],todayXP:0,quizAnswered:false};
var LEVELS=[{name:'Geld-Neuling',min:0,max:49},{name:'Spar-Starter',min:50,max:149},{name:'Money-Macher',min:150,max:299},{name:'Finanz-Profi',min:300,max:599},{name:'Money Hero',min:600,max:999},{name:'BLKB Legend',min:1000,max:9999}];
var KAPITEL=[{id:1,title:'Was ist Geld?',karten:4,icon:'💰',color:'#FFF0F0'},{id:2,title:'Mein erstes Konto',karten:5,icon:'🏦',color:'#E6F1FB'},{id:3,title:'Clever bezahlen',karten:5,icon:'💳',color:'#EAF3DE'},{id:4,title:'Mein erster Lohn',karten:5,icon:'💼',color:'#EEEDFE'},{id:5,title:'Grosse Ziele',karten:4,icon:'🚀',color:'#E1F5EE'}];
var selectedIcon='✈️';
var HAXX=[{id:'easy10',title:'Easy-10 Hack',sub:'Zahle dich zuerst — jeden Monat',icon:'💸',bg:'#FFF3CD',tag:'SPAREN',tagBg:'#FFF3CD',tagColor:'#854F0B',text:'Überweise am Zahltag automatisch 10% deines Lohns auf dein Sparkonto. Du merkst es kaum — dein Konto schon.'},{id:'nullschulden',title:'Null-Schulden Hack',sub:'Keine Steuerüberraschungen mehr',icon:'📋',bg:'#F5F5F5',tag:'STEUERN',tagBg:'#F5F5F5',tagColor:'#555',text:'Lege jeden Monat 15–20% für Steuern zurück. Separates Konto einrichten.'},{id:'dinimieti',title:'Dini-Mieti Hack',sub:'Miete max. 25% des Nettolohns',icon:'🏠',bg:'#E6F1FB',tag:'BUDGET',tagBg:'#E6F1FB',tagColor:'#185FA5',text:'Deine Miete sollte nie mehr als 25% deines Nettolohns betragen.'},{id:'fiftyfifty',title:'Fifty-Fifty Hack',sub:'Lohnerhöhung clever aufteilen',icon:'⚖️',bg:'#EEEDFE',tag:'MINDSET',tagBg:'#EEEDFE',tagColor:'#534AB7',text:'Kriegst du eine Lohnerhöhung? Hälfte sparen, Hälfte geniessen.'},{id:'ego',title:'Ego-Hack',sub:'Investiere in dich selbst',icon:'🎯',bg:'#EAF3DE',tag:'KARRIERE',tagBg:'#EAF3DE',tagColor:'#3B6D11',text:'Kurse, Bücher, Zertifikate — wer in Wissen investiert, bekommt die höchste Rendite.'},{id:'getrich',title:'Get-Rich Hack',sub:'So wächst dein Geld während du schläfst',icon:'📈',bg:'#E1F5EE',tag:'INVESTIEREN',tagBg:'#E1F5EE',tagColor:'#085041',text:'Fondssparplan: CHF 100/Mt bei 7% Rendite = nach 30 Jahren über CHF 113\'000.'}];
var BADGES=[{id:'first-goal',name:'Erster Sparschritt',desc:'Erstes Sparziel erstellt',icon:'🎯',bg:'#EAF3DE'},{id:'goal-done',name:'Ziel erreicht!',desc:'Sparziel vollständig erfüllt',icon:'🏆',bg:'#EAF3DE'},{id:'visionary',name:'Visionär',desc:'Drei Sparziele gleichzeitig',icon:'⭐',bg:'#EEEDFE'},{id:'bigdream',name:'Gross-Denker',desc:'Ziel über CHF 1\'000',icon:'🚀',bg:'#EAF3DE'},{id:'haxx-master',name:'MoneyHaxx Master',desc:'Alle 6 Hacks verstanden',icon:'⚡',bg:'#FFF3CD'},{id:'budget-pro',name:'Budget-Profi',desc:'Budget vollständig ausgefüllt',icon:'📊',bg:'#E6F1FB'},{id:'investor',name:'Investor',desc:'Geld-vermehren gestartet',icon:'📈',bg:'#E1F5EE'},{id:'decider',name:'Entscheider',desc:'Erste Entscheidung getroffen',icon:'🎲',bg:'#FCEBEB'}];
var QUIZ=[{q:'Was sind Zinsen?',opts:['Gebühren für Kontoführung','Kosten für Bargeld','Entgelt für geliehenes Geld','Steuern auf Ersparnisse'],correct:2,xp:15},{q:'Was bedeutet Zinseszins?',opts:['Doppelte Zinsen','Zinsen auf bereits verdiente Zinsen','Negative Zinsen','Staatliche Zinsen'],correct:1,xp:15},{q:'Was ist die Säule 3a?',opts:['Eine Steuerart','Private Altersvorsorge mit Steuervorteilen','Ein Bankkonto','Eine Versicherung'],correct:1,xp:15}];
var TIPS=['Spare zuerst, gib dann aus. 10% des Lohns sofort aufs Sparkonto.','Lehrlingslohn clever: 10% sparen, Rest budgetieren.','Lohnerhöhung: Hälfte sparen, Hälfte geniessen.','Miete max. 25% des Nettolohns.','Fondssparplan starten — Zeit ist dein grösster Hebel.'];
var VIEWS={home:{id:'view-home',nav:'nav-home',title:'Start'},learn:{id:'view-learn',nav:'nav-learn',title:'Finanz-Schule'},goals:{id:'view-goals',nav:'nav-goals',title:'Meine Ziele'},hero:{id:'view-hero',nav:'nav-hero',title:'Money Hero'},haxx:{id:'view-haxx',nav:'nav-haxx',title:'Moneyhaxx'}};

function nav(v){if(!VIEWS[v])return;document.querySelectorAll('.view').forEach(function(x){x.classList.remove('active');});document.querySelectorAll('.nav-btn').forEach(function(x){x.classList.remove('active');});document.getElementById(VIEWS[v].id).classList.add('active');document.getElementById(VIEWS[v].nav).classList.add('active');document.getElementById('hdr-title').textContent=VIEWS[v].title;if(v==='home')renderHome();if(v==='learn')renderLearn();if(v==='goals')renderGoals();if(v==='hero')renderHero();if(v==='haxx')renderHaxx();}
function getLvl(xp){for(var i=LEVELS.length-1;i>=0;i--)if(xp>=LEVELS[i].min)return i;return 0;}

function renderHome(){
  var lvl=getLvl(state.xp);var lv=LEVELS[lvl];
  var total=state.kontoGuthaben+state.sparGuthaben;
  document.getElementById('home-total').textContent='CHF '+total.toLocaleString('de-CH',{minimumFractionDigits:2,maximumFractionDigits:2});
  document.getElementById('home-konto').textContent=Math.round(state.kontoGuthaben).toLocaleString('de-CH');
  document.getElementById('home-sparen').textContent=Math.round(state.sparGuthaben).toLocaleString('de-CH');
  document.getElementById('home-xp').textContent=state.xp;
  var lvlPct=Math.round((state.xp-lv.min)/(lv.max-lv.min)*100);
  var lvlEl=document.getElementById('home-budget-pct');var lvlLbl=document.getElementById('home-budget-lbl');
  if(lvlEl)lvlEl.textContent=lvlPct+'%';
  if(lvlLbl)lvlLbl.textContent='Level '+(lvl+1)+' · '+lv.name;
  if(state.goals.length>0){var g=state.goals[0];var gpct=Math.min(Math.round(state.sparGuthaben/g.target*100),100);var gEl=document.getElementById('home-goal-pct');var gNm=document.getElementById('home-goal-name');if(gEl)gEl.textContent=gpct+'%';if(gNm)gNm.textContent=g.emoji+' '+g.name;}
  else{var gEl2=document.getElementById('home-goal-pct');var gNm2=document.getElementById('home-goal-name');if(gEl2)gEl2.textContent='–';if(gNm2)gNm2.textContent='Kein Ziel gesetzt';}
  var done=state.kapitelDone.length;var next=KAPITEL[done]||KAPITEL[KAPITEL.length-1];
  document.getElementById('home-task-kap').textContent='Kapitel '+next.id;
  document.getElementById('home-task-title').textContent=next.title;
  document.getElementById('home-task-sub').textContent=next.karten+' Karten · ca. '+next.karten+' Min';
  document.getElementById('home-tip').textContent=TIPS[Math.floor(Math.random()*TIPS.length)];
  var kb=document.getElementById('home-konto-bal');var sb=document.getElementById('home-spar-bal');
  if(kb)kb.textContent='CHF '+state.kontoGuthaben.toLocaleString('de-CH',{minimumFractionDigits:2,maximumFractionDigits:2});
  if(sb)sb.textContent='CHF '+state.sparGuthaben.toLocaleString('de-CH',{minimumFractionDigits:2,maximumFractionDigits:2});
}

function renderLearn(){
  var done=state.kapitelDone.length;
  document.getElementById('learn-progress-lbl').textContent=done+' / '+KAPITEL.length+' Kapitel';
  document.getElementById('learn-progress-bar').style.width=Math.round(done/KAPITEL.length*100)+'%';
  var html='';
  KAPITEL.forEach(function(k,i){var isDone=state.kapitelDone.indexOf(k.id)>-1;var isNew=i===done;var isLocked=i>done;var bc=isDone?'done':isNew?'new':'locked';var bt=isDone?'Abgeschlossen':isNew?'Neu':'Gesperrt';
    html+='<div class="kapitel-item" onclick="'+(isLocked?'':'startKapitel('+k.id+')')+'"><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><div style="width:36px;height:36px;border-radius:9px;background:'+k.color+';display:flex;align-items:center;justify-content:center;font-size:18px;opacity:'+(isLocked?.4:1)+'">'+k.icon+'</div><div style="flex:1"><div class="kapitel-num">Kapitel '+k.id+'</div><div class="kapitel-title" style="opacity:'+(isLocked?.4:1)+'">'+k.title+'</div></div><span class="kapitel-badge '+bc+'">'+bt+'</span></div><div class="prog-wrap"><div class="prog-fill" style="width:'+(isDone?100:0)+'%"></div></div><div style="font-size:var(--fs-label);color:var(--light);margin-top:4px">'+k.karten+' Karten</div></div>';
  });
  document.getElementById('learn-chapters').innerHTML=html;
}
function startKapitel(id){if(state.kapitelDone.indexOf(id)===-1){state.kapitelDone.push(id);addXP(20);save();showToast('Kapitel abgeschlossen! +20 XP');renderLearn();}}

function renderGoals(){
  document.getElementById('spar-total').textContent='CHF '+state.sparGuthaben.toLocaleString('de-CH');
  var html='';var tt=0,ts=0;
  state.goals.forEach(function(g,i){var pct=Math.min(Math.round(state.sparGuthaben/g.target*100),100);tt+=g.target;ts=Math.min(state.sparGuthaben,tt);
    html+='<div class="goal-item"><div class="goal-header"><div class="goal-icon">'+g.emoji+'</div><div style="flex:1"><div class="goal-name">'+g.name+'</div><div class="goal-amounts">CHF '+Math.min(state.sparGuthaben,g.target).toLocaleString('de-CH')+' / '+g.target.toLocaleString('de-CH')+'</div></div><div class="goal-pct">'+(pct>=100?'<span style="color:var(--ok)">Erreicht!</span>':pct+'%')+'</div><button onclick="delGoal('+i+')" style="background:none;border:none;font-size:16px;opacity:.4;cursor:pointer;margin-left:6px" aria-label="Löschen">🗑</button></div><div class="goal-bar-wrap"><div class="prog-wrap"><div class="prog-fill" style="width:'+pct+'%;background:'+(pct>=100?'var(--ok)':'var(--red)')+'"></div></div></div></div>';
  });
  if(!state.goals.length)html='<div style="padding:24px 16px;text-align:center;color:var(--mid)"><div style="font-size:32px;margin-bottom:8px">🎯</div><div>Noch keine Sparziele — leg jetzt los!</div></div>';
  document.getElementById('goals-list').innerHTML=html;
  var tp=tt>0?Math.round(ts/tt*100):0;
  document.getElementById('goals-total-lbl').textContent='CHF '+ts.toLocaleString('de-CH')+' / '+tt.toLocaleString('de-CH');
  document.getElementById('goals-total-bar').style.width=tp+'%';
}

function selectGoalIcon(emoji,el){selectedIcon=emoji;document.querySelectorAll('.icon-pick-btn').forEach(function(b){b.style.background='#F5F5F5';b.style.border='1.5px solid transparent';});el.style.background='#FFF0F1';el.style.border='1.5px solid #E30613';}
function openGoalModal(){selectedIcon='✈️';document.getElementById('goal-modal').classList.add('open');setTimeout(function(){var btns=document.querySelectorAll('.icon-pick-btn');btns.forEach(function(b,i){if(i===0){b.style.background='#FFF0F1';b.style.border='1.5px solid #E30613';}else{b.style.background='#F5F5F5';b.style.border='1.5px solid transparent';}});},50);}
function saveGoal(){var n=document.getElementById('goal-name-inp').value.trim();var a=parseInt(document.getElementById('goal-amt-inp').value);if(!n||!a||a<=0){showToast('Name und Betrag eingeben');return;}state.goals.push({name:n,target:a,emoji:selectedIcon});document.getElementById('goal-name-inp').value='';document.getElementById('goal-amt-inp').value='';document.getElementById('goal-modal').classList.remove('open');earnBadge('first-goal');if(state.goals.length>=3)earnBadge('visionary');if(a>=1000)earnBadge('bigdream');addXP(10);save();renderGoals();renderHome();showToast('Sparziel erstellt! +10 XP');}
function delGoal(i){state.goals.splice(i,1);save();renderGoals();renderHome();}

function renderHero(){
  var lvl=getLvl(state.xp);var lv=LEVELS[lvl];var pct=Math.round((state.xp-lv.min)/(lv.max-lv.min)*100);
  document.getElementById('hero-streak-days').textContent=state.streak;document.getElementById('hero-level-name').textContent=lv.name;document.getElementById('hero-xp').textContent=state.xp;document.getElementById('hero-level').textContent=lvl+1;document.getElementById('hero-xp-bar').style.width=pct+'%';document.getElementById('hero-xp-next').textContent=(lv.max-state.xp)+' XP bis zum nächsten Level';
  var txEl=document.getElementById('hero-today-xp');if(txEl)txEl.textContent=state.todayXP;
  var tasks=[{icon:'❓',label:'Tages-Quiz lösen',xp:15},{icon:'🎯',label:'Daily Challenge',xp:20},{icon:'🎲',label:'Story entscheiden',xp:20}];
  var th='';tasks.forEach(function(t){th+='<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)"><div style="width:36px;height:36px;border-radius:9px;background:#F5F5F5;display:flex;align-items:center;justify-content:center;font-size:18px">'+t.icon+'</div><div style="flex:1;font-size:var(--fs-sub);font-weight:600;color:var(--dark)">'+t.label+'</div><div style="font-size:var(--fs-sub);font-weight:700;color:var(--red)">+'+t.xp+' XP</div></div>';});
  document.getElementById('hero-daily-tasks').innerHTML=th;
  if(!state.quizAnswered){var q=QUIZ[Math.floor(Math.random()*QUIZ.length)];var qh='<div class="quiz-card"><div class="quiz-q">'+q.q+'</div>';q.opts.forEach(function(o,i){qh+='<div class="quiz-opt" onclick="answerQuiz(this,'+i+','+q.correct+','+q.xp+')">'+o+'</div>';});document.getElementById('hero-quiz-container').innerHTML=qh+'</div>';}
  var bh='';BADGES.forEach(function(b){var e=state.badges.indexOf(b.id)>-1||badgeAuto(b.id);bh+='<div class="badge-item '+(e?'':'locked')+'"><div class="badge-icon" style="background:'+(e?b.bg:'#F4F4F4')+'">'+b.icon+'</div><div><div class="badge-name">'+b.name+'</div><div class="badge-desc">'+b.desc+'</div></div></div>';});
  document.getElementById('hero-badges').innerHTML=bh;
}
function answerQuiz(el,chosen,correct,xpVal){if(state.quizAnswered)return;state.quizAnswered=true;el.parentNode.querySelectorAll('.quiz-opt').forEach(function(o,i){if(i===correct)o.classList.add('correct');else if(i===chosen&&chosen!==correct)o.classList.add('wrong');});if(chosen===correct){addXP(xpVal);showToast('Richtig! +'+xpVal+' XP');}else showToast('Nicht ganz — richtige Antwort ist markiert');save();}
function badgeAuto(id){if(id==='first-goal'&&state.goals.length>=1)return true;if(id==='visionary'&&state.goals.length>=3)return true;if(id==='haxx-master'&&state.haxxDone.length>=6)return true;if(id==='goal-done')return state.goals.some(function(g){return state.sparGuthaben>=g.target;});return false;}
function earnBadge(id){if(state.badges.indexOf(id)===-1){state.badges.push(id);save();}}

function renderHaxx(){
  var done=state.haxxDone.length;
  document.getElementById('haxx-progress-lbl').textContent=done+' von 6 verstanden';
  document.getElementById('haxx-progress-bar').style.width=Math.round(done/6*100)+'%';
  var html='';
  HAXX.forEach(function(h){var isDone=state.haxxDone.indexOf(h.id)>-1;
    html+='<div class="haxx-item '+(isDone?'done':'')+'" id="hx-'+h.id+'"><div class="haxx-header" onclick="toggleHaxx(\''+h.id+'\')"><div class="haxx-icon" style="background:'+h.bg+'">'+h.icon+'</div><div style="flex:1"><div class="haxx-title">'+h.title+'</div><div class="haxx-sub">'+h.sub+'</div></div><span class="haxx-tag" style="background:'+h.tagBg+';color:'+h.tagColor+'">'+h.tag+'</span>'+(isDone?'<span style="margin-left:6px;color:var(--ok);font-size:18px">✓</span>':'<i class="ti ti-chevron-down" style="margin-left:6px;color:var(--light)"></i>')+'</div><div class="haxx-body"><div class="haxx-body-text">'+h.text+'</div>'+(!isDone?'<button class="btn-primary" style="margin-top:12px" onclick="doneHaxx(\''+h.id+'\')">Verstanden ✓</button>':'')+'</div></div>';
  });
  document.getElementById('haxx-list').innerHTML=html;
}
function toggleHaxx(id){document.getElementById('hx-'+id).classList.toggle('open');}
function doneHaxx(id){if(state.haxxDone.indexOf(id)===-1){state.haxxDone.push(id);addXP(15);if(state.haxxDone.length>=6)earnBadge('haxx-master');save();renderHaxx();showToast('Hack verstanden! +15 XP');}}

function addXP(n){state.xp+=n;state.todayXP+=n;save();}
function showToast(m){var t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(function(){t.classList.remove('show');},2500);}
document.getElementById('goal-modal').addEventListener('click',function(e){if(e.target===this)this.classList.remove('open');});

var aiAge='kind';var aiHistory=[];
var AI_P={kind:'Du bist BLKB Finanzcoach für Kinder (8-12 J.). Erkläre sehr einfach, max 2-3 Sätze, auf Deutsch.',teen:'Du bist BLKB Finanzcoach für Teenager (13-17 J.). Jugendgerecht, max 3-4 Sätze, auf Deutsch.',erwachsen:'Du bist BLKB Finanzcoach für junge Erwachsene (18-30 J.). Schweizer Kontext, max 4-5 Sätze, auf Deutsch.'};
var AI_W={kind:'Hoi! Was möchtest du über Geld wissen? 😊',teen:'Hey! Frag mich alles über Sparen, Karten oder deinen ersten Lohn! 🚀',erwachsen:'Hallo! Ich beantworte gerne Fragen zu Vorsorge, Anlegen und mehr.'};
function aiSetAge(age){aiAge=age;aiHistory=[];document.querySelectorAll('.age-btn').forEach(function(b){b.classList.toggle('active',b.dataset.age===age);});document.getElementById('aiMessages').innerHTML='<div class="ai-bubble coach"><div class="ai-badge-lbl">BLKB Coach</div><span>'+AI_W[age]+'</span></div>';}
function aiAskTopic(t){document.getElementById('aiInput').value='Erkläre mir: '+t;aiSend();}
function aiSend(){var inp=document.getElementById('aiInput');var text=inp.value.trim();if(!text)return;inp.value='';var msgs=document.getElementById('aiMessages');var ud=document.createElement('div');ud.className='ai-bubble user';ud.textContent=text;msgs.appendChild(ud);aiHistory.push({role:'user',content:text});var td=document.createElement('div');td.className='ai-bubble coach';td.innerHTML='<div class="ai-badge-lbl">BLKB Coach</div><span style="opacity:.5">···</span>';var tid='t'+Date.now();td.id=tid;msgs.appendChild(td);msgs.scrollTop=msgs.scrollHeight;fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:300,system:AI_P[aiAge],messages:aiHistory})}).then(function(r){return r.json();}).then(function(d){var r=d.content&&d.content[0]?d.content[0].text:'Keine Antwort.';aiHistory.push({role:'assistant',content:r});var el=document.getElementById(tid);if(el)el.innerHTML='<div class="ai-badge-lbl">BLKB Coach</div><span>'+r+'</span>';msgs.scrollTop=msgs.scrollHeight;}).catch(function(){var el=document.getElementById(tid);if(el)el.innerHTML='<div class="ai-badge-lbl">BLKB Coach</div><span>Verbindungsfehler.</span>';});}

function save(){try{localStorage.setItem('blkb_v2',JSON.stringify(state));localStorage.setItem('blkb_ob_done','1');}catch(e){}}
function load(){try{var s=localStorage.getItem('blkb_v2');if(s){var p=JSON.parse(s);var haxxIds=HAXX.map(function(h){return h.id;});if(p.haxxDone&&!p.badges){p.badges=p.haxxDone.filter(function(id){return haxxIds.indexOf(id)===-1;});p.haxxDone=p.haxxDone.filter(function(id){return haxxIds.indexOf(id)>-1;});}Object.assign(state,p);}}catch(e){}}
function checkOnboarding(){try{var seen=localStorage.getItem('blkb_ob_done');if(seen){document.getElementById('onboarding').style.display='none';}}catch(e){document.getElementById('onboarding').style.display='none';}}
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js');
load();checkOnboarding();renderHome();renderLearn();renderGoals();renderHero();renderHaxx();nav('home');

var obStep=0;var obIcon='✈️';
function obSelectIcon(emoji,el){obIcon=emoji;document.querySelectorAll('.ob-icon-btn').forEach(function(b){b.classList.remove('sel');});el.classList.add('sel');}
function obNext(){if(obStep===0){obGoTo(1);}else if(obStep===1){var k=parseFloat(document.getElementById('ob-konto').value)||0;var s=parseFloat(document.getElementById('ob-spar').value)||0;state.kontoGuthaben=k;state.sparGuthaben=s;obGoTo(2);}else if(obStep===2){var name=document.getElementById('ob-goal-name').value.trim();var amt=parseInt(document.getElementById('ob-goal-amt').value);if(name&&amt>0){state.goals.push({name:name,target:amt,emoji:obIcon});earnBadge('first-goal');}obFinish();}}
function obGoTo(step){document.getElementById('ob-'+obStep).classList.remove('active');document.getElementById('ob-dot-'+obStep).classList.remove('active');obStep=step;document.getElementById('ob-'+obStep).classList.add('active');document.getElementById('ob-dot-'+obStep).classList.add('active');var btn=document.getElementById('ob-next-btn');var skip=document.getElementById('ob-skip-btn');if(step===2){btn.textContent='App starten';skip.textContent='Ohne Ziel starten';}else if(step===1){btn.textContent='Weiter';skip.style.display='none';}else{btn.textContent='Los geht\'s';}}
function obSkip(){obFinish();}
function obFinish(){save();var ob=document.getElementById('onboarding');ob.style.opacity='0';ob.style.transition='opacity .4s';setTimeout(function(){ob.style.display='none';},400);renderHome();renderGoals();addXP(10);showToast('Willkommen! +10 XP für den Start');}
