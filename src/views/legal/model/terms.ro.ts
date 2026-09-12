import type { LegalDocument } from './types';

export const termsRo: LegalDocument = {
  title: 'Termeni și condiții',
  updatedAt: '2026-09-12',
  intro: [
    'Acest text explică ce face Facturo, ce face dumneavoastră și cine răspunde pentru ce. L-am scris simplu, ca să poată fi citit până la capăt.',
    'Prin crearea unui cont sunteți de acord cu cele scrise mai jos.',
  ],
  sections: [
    {
      heading: 'Ce este Facturo',
      paragraphs: [
        'Facturo este un program care vă ajută să întocmiți facturi electronice și să le trimiteți prin sistemul e-Factura al Serviciului Fiscal de Stat.',
      ],
      bullets: [
        'Facturo nu este contabil și nu ține contabilitatea companiei dumneavoastră.',
        'Facturo nu oferă consultanță fiscală sau juridică.',
        'Facturo nu verifică dacă datele pe care le introduceți sunt corecte și nu decide dacă o operațiune este legală.',
        'Facturo nu este parte a Serviciului Fiscal de Stat și nu îl reprezintă.',
      ],
    },
    {
      heading: 'Ce răspundeți dumneavoastră',
      bullets: [
        'Corectitudinea, caracterul complet și termenele documentelor pe care le întocmiți.',
        'Respectarea obligațiilor fiscale ale companiei dumneavoastră.',
        'Datele contragenților pe care le încărcați în sistem și dreptul dumneavoastră de a le folosi.',
        'Păstrarea parolei. Tot ce se face din contul dumneavoastră se consideră făcut de dumneavoastră.',
      ],
    },
    {
      heading: 'Ce nu putem garanta',
      paragraphs: [
        'Facturo transmite documentele către sistemul e-Factura, dar nu îl administrează. Dacă sistemul statului nu răspunde, este lent sau refuză un document, acest lucru nu depinde de noi.',
        'Nu promitem funcționare neîntreruptă. Facem tot ce putem, anunțăm din timp lucrările planificate, dar nu garantăm o disponibilitate de 100%.',
      ],
    },
    {
      heading: 'Limita răspunderii noastre',
      paragraphs: [
        'Răspundem doar pentru funcționarea programului și doar în limita sumei pe care ne-ați plătit în ultimele 12 luni.',
      ],
      bullets: [
        'Nu răspundem pentru amenzi, penalități sau pierderea dreptului de deducere a TVA.',
        'Nu răspundem pentru profitul nerealizat, pentru contractele pierdute și pentru alte pierderi indirecte.',
        'Nu răspundem pentru indisponibilitatea sistemului e-Factura, a rețelei bancare sau a internetului.',
        'Nu răspundem pentru consecințele unor date greșite introduse de dumneavoastră.',
      ],
    },
    {
      heading: 'Ce nu aveți voie să faceți',
      bullets: [
        'Să folosiți Facturo pentru documente fictive sau pentru activități interzise de lege.',
        'Să copiați programul, să încercați să îi obțineți codul sursă sau să construiți un produs concurent pe baza lui.',
        'Să revindeți accesul, să îl împărțiți cu alte companii sau să automatizați accesul fără acordul nostru scris.',
        'Să încercați să accesați datele altor utilizatori sau să perturbați funcționarea serviciului.',
      ],
      paragraphs: [
        'În cazul încălcării acestor reguli putem suspenda contul. Vă anunțăm și vă explicăm motivul, iar datele dumneavoastră rămân accesibile pentru descărcare.',
      ],
    },
    {
      heading: 'Prețul și plata',
      paragraphs: [
        'Prețul curent este afișat pe pagina de tarife, cu TVA inclus. Plata se face cu cardul, prin maib.',
        'Dacă schimbăm prețul, vă anunțăm cu cel puțin 30 de zile înainte. Perioada deja plătită nu se scumpește.',
        'Dacă plata nu intră la timp, limităm crearea de documente noi. Documentele deja emise rămân accesibile: sunteți obligat prin lege să le păstrați.',
      ],
    },
    {
      heading: 'Drepturile asupra programului',
      paragraphs: [
        'Programul, interfața, textele, structura bazei de date, denumirea și sigla Facturo ne aparțin. Dumneavoastră primiți dreptul de a folosi serviciul cât timp aveți un cont activ — nu drepturi asupra programului însuși.',
        'Datele pe care le introduceți rămân ale dumneavoastră. Le puteți descărca oricând și nu le folosim în alte scopuri decât funcționarea serviciului.',
        'Dacă ne propuneți o îmbunătățire și o realizăm, rezultatul ne aparține. Nu vă datorăm plată pentru o sugestie, iar dumneavoastră nu pierdeți nimic.',
      ],
    },
    {
      heading: 'Închiderea contului',
      paragraphs: [
        'Puteți închide contul oricând din Setări. Înainte de asta descărcați documentele: după închidere nu mai aveți acces la ele prin interfață.',
        'Documentele fiscale se păstrează în arhivă șase ani, pentru că legea ne obligă. Nu le folosim în niciun alt scop.',
      ],
    },
    {
      heading: 'Modificarea acestor condiții',
      paragraphs: [
        'Dacă schimbăm ceva important, vă anunțăm prin e-mail și în interfață cu cel puțin 30 de zile înainte. Dacă nu sunteți de acord, puteți închide contul, iar perioada plătită și nefolosită se restituie.',
      ],
    },
    {
      heading: 'Legea aplicabilă și litigiile',
      paragraphs: [
        'Se aplică legislația Republicii Moldova.',
        'Dacă apare o neînțelegere, scrieți-ne mai întâi nouă: răspundem în cel mult 30 de zile și în cele mai multe cazuri se rezolvă acolo. Dacă nu, competente sunt instanțele din Chișinău.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: ['Scrieți la contact@facturo.md. Răspundem în zilele lucrătoare.'],
    },
  ],
};
