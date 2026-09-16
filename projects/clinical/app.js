const sample = 'Patient on Warfarin therapy for 3 months. Started Aspirin 75mg daily. Complains of mild dizziness.';
const note = document.querySelector('#note');
const extra = document.querySelector('#extra');
const results = document.querySelector('#results');
const empty = document.querySelector('#empty');
const knownDrugs = ['Warfarin','Aspirin','Amlodipine','Ibuprofen','Paracetamol','Lisinopril','Metformin','Digoxin','Amiodarone','Simvastatin','Erythromycin','Omeprazole','Clarithromycin','Sitagliptin'];

document.querySelector('#sampleBtn').addEventListener('click',()=>{note.value=sample;extra.value='';note.focus()});
document.querySelector('#analyzeBtn').addEventListener('click',()=>{
  const value=note.value.trim(); if(!value){note.focus();note.style.borderColor='#b64646';return} note.style.borderColor='';
  const drugs=knownDrugs.filter(d=>new RegExp(`\\b${d}\\b`,'i').test(value));
  extra.value.split(',').map(x=>x.trim()).filter(Boolean).forEach(d=>{if(!drugs.some(x=>x.toLowerCase()===d.toLowerCase()))drugs.push(d)});
  const doses=[...value.matchAll(/\b\d+(?:\.\d+)?\s*(?:mg|ml|g)\b/gi)].map(m=>m[0]);
  const durations=[...value.matchAll(/\b\d+\s*(?:day|days|week|weeks|month|months)\b/gi)].map(m=>m[0]);
  const symptoms=['pain','headache','nausea','dizziness','fever','cough'].filter(s=>new RegExp(`\\b${s}\\b`,'i').test(value));
  const entities=[...drugs.map(x=>[x,'Medication']),...doses.map(x=>[x,'Dosage']),...durations.map(x=>[x,'Duration']),...symptoms.map(x=>[x,'Symptom'])];
  const entityChips=document.querySelector('#entityChips');
  entityChips.replaceChildren();
  if(!entities.length){const chip=document.createElement('span');chip.className='chip';chip.textContent='No known entities found';entityChips.append(chip)}
  entities.forEach(([value,type])=>{const chip=document.createElement('span');chip.className='chip';chip.textContent=value;const label=document.createElement('b');label.textContent=type;chip.append(label);entityChips.append(chip)});
  const relation=document.createElement('div');relation.className='relation';
  if(drugs.length&&doses.length){relation.append(document.createTextNode(`${drugs.at(-1)} `));const arrow=document.createElement('strong');arrow.textContent='→';relation.append(arrow,document.createTextNode(` ${doses[0]}`))}
  else relation.textContent='No medication-dosage relationship detected';
  document.querySelector('#relations').replaceChildren(relation);
  const risky=drugs.some(x=>/warfarin/i.test(x))&&drugs.some(x=>/aspirin|ibuprofen/i.test(x));
  document.querySelector('#warning').hidden=!risky;
  if(risky){const other=drugs.find(x=>/aspirin|ibuprofen/i.test(x));document.querySelector('#warningTitle').textContent=`Warfarin + ${other}`;document.querySelector('#warningText').textContent='This pair may increase bleeding risk. Review the interaction with a qualified clinician.';document.querySelector('#severity').textContent='High severity'}
  document.querySelector('#entityCount').textContent=entities.length;document.querySelector('#relationCount').textContent=drugs.length&&doses.length?1:0;document.querySelector('#interactionCount').textContent=risky?1:0;
  empty.hidden=true;results.hidden=false;document.querySelector('#caseCount').textContent=Number(document.querySelector('#caseCount').textContent)+1;
});
