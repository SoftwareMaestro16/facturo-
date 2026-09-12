import type { LegalDocument } from './types';

export const privacyRo: LegalDocument = {
  title: 'Politica de confidențialitate',
  updatedAt: '2026-09-12',
  intro: [
    'Aici scrie ce date colectăm, de ce, cui le transmitem și cât le păstrăm. Fără formulări ascunse.',
    'Pe scurt: colectăm doar ce este necesar ca serviciul să funcționeze, nu vindem nimic nimănui și nu folosim cookie-uri de publicitate.',
  ],
  sections: [
    {
      heading: 'Cine răspunde de datele dumneavoastră',
      paragraphs: [
        'Operatorul datelor este Facturo. Pentru orice întrebare legată de date scrieți la privacy@facturo.md.',
      ],
    },
    {
      heading: 'Ce colectăm',
      bullets: [
        'Datele contului: numele, adresa de e-mail, telefonul, limba interfeței.',
        'Datele companiei: denumirea, IDNO, codul TVA, adresa, contul bancar.',
        'Datele contragenților pe care îi introduceți: denumire, IDNO, adresă, contacte.',
        'Conținutul documentelor: poziții, cantități, sume, TVA, note.',
        'Date tehnice: adresa IP, tipul browserului, data și ora acțiunilor importante — intrare în cont, schimbarea parolei, trimiterea unui document.',
      ],
      paragraphs: [
        'Nu colectăm date despre card. Cardul se introduce pe pagina băncii; la noi ajunge doar un identificator al plății.',
      ],
    },
    {
      heading: 'De ce le colectăm',
      bullets: [
        'Ca serviciul să funcționeze: să întocmiți documente și să le trimiteți prin e-Factura.',
        'Ca să respectăm legea: facturile fiscale se păstrează, iar datele se transmit sistemului statului.',
        'Ca să emitem factura pentru abonament și să încasăm plata.',
        'Ca să protejăm contul: jurnalul de intrări ne ajută să observăm o încercare de acces străin.',
      ],
      paragraphs: [
        'Nu folosim datele dumneavoastră pentru publicitate, nu le analizăm în alte scopuri și nu le vindem.',
      ],
    },
    {
      heading: 'Datele contragenților dumneavoastră',
      paragraphs: [
        'Când introduceți în Facturo datele partenerilor dumneavoastră, dumneavoastră decideți de ce le colectați și cât le păstrați. Noi doar le stocăm și le prelucrăm la comanda dumneavoastră, în limitele acestei politici.',
        'Este responsabilitatea dumneavoastră să aveți temei legal pentru a le folosi.',
      ],
    },
    {
      heading: 'Cui transmitem datele',
      bullets: [
        'Serviciului Fiscal de Stat — conținutul documentelor, pentru că legea cere transmiterea lor prin e-Factura.',
        'maib — datele necesare încasării plății pentru abonament.',
        'Furnizorului de găzduire a bazei de date și furnizorului de monitorizare a erorilor — strict tehnic, pentru ca serviciul să funcționeze.',
        'Autorităților — doar la o cerere legală, întemeiată și scrisă.',
      ],
      paragraphs: ['Nimănui altcuiva. Lista completă se actualizează dacă se schimbă ceva.'],
    },
    {
      heading: 'Cookie-uri',
      paragraphs: [
        'Folosim doar cookie-uri funcționale: sesiunea dumneavoastră și limba aleasă. Fără cookie-uri de publicitate și fără urmărire.',
        'De aceea nu vedeți bannerul de consimțământ: nu avem pentru ce să îl cerem.',
      ],
    },
    {
      heading: 'Cât păstrăm datele',
      bullets: [
        'Datele contului — cât timp contul este activ.',
        'Documentele fiscale și dovada transmiterii lor — șase ani, conform legii, inclusiv după închiderea contului.',
        'Jurnalul de securitate — 12 luni.',
      ],
    },
    {
      heading: 'Cum le protejăm',
      bullets: [
        'Traficul este criptat pe tot traseul.',
        'Parola nu se păstrează niciodată în clar, ci doar sub forma unei amprente ireversibile.',
        'Fiecare companie vede doar propriile date; separarea este verificată la fiecare cerere.',
        'Accesul angajaților la baza de date este limitat și înregistrat.',
      ],
    },
    {
      heading: 'Drepturile dumneavoastră',
      bullets: [
        'Să aflați ce date avem despre dumneavoastră.',
        'Să cereți corectarea datelor greșite.',
        'Să cereți ștergerea — în măsura în care legea nu ne obligă să le păstrăm.',
        'Să primiți datele într-un fișier pe care îl puteți deschide în alt program.',
        'Să vă opuneți prelucrării.',
      ],
      paragraphs: [
        'Scrieți la privacy@facturo.md. Răspundem în cel mult 30 de zile și vă spunem exact ce am făcut.',
      ],
    },
    {
      heading: 'Ștergerea contului',
      paragraphs: [
        'Puteți închide contul din Setări. Descărcați documentele înainte. Datele care nu sunt obligatorii prin lege se șterg în 30 de zile.',
      ],
    },
    {
      heading: 'Modificări',
      paragraphs: [
        'Dacă schimbăm ceva important, vă anunțăm prin e-mail și în interfață cu cel puțin 30 de zile înainte. Data ultimei modificări este scrisă la începutul paginii.',
      ],
    },
  ],
};
