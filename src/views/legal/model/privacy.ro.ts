import type { LegalDocument } from './types';
export const privacyRo: LegalDocument = {
  title: 'Politica de confidențialitate Facturo',
  updatedAt: '2026-09-13',
  intro: [
    'Politica descrie prelucrarea datelor personale în Facturo și nu înlocuiește acordul de prelucrare dintre furnizor și client.',
    'Versiune preliminară: înainte de lansarea comercială trebuie completate lista persoanelor împuternicite și termenele concrete de păstrare.',
  ],
  sections: [
    {
      heading: '1. Operator și roluri',
      paragraphs: [
        'Pentru datele contului și organizarea serviciului, operatorul este Şcerbacov Daniil, antreprenor independent (freelancer), Republica Moldova, IDNO 1026023032436. Operatorul nu deține o adresă poștală de corespondență; unicul contact este daniilscherbakov1@gmail.com.',
        'Pentru datele personale din documente și cataloage, clientul stabilește de regulă scopurile, iar furnizorul acționează conform instrucțiunilor documentate ale acestuia. Rolurile depind de prelucrarea efectivă; denumirea contractuală nu înlătură obligațiile legale.',
      ],
    },
    {
      heading: '2. Categorii de date',
      bullets: [
        'La autentificarea Google: identificatorul Google, emailul verificat, numele și datele necesare verificării autentificării. Parola Google nu este transmisă serviciului.',
        'Datele companiei și participanților: date de identificare, IDNO, contacte, limbă, roluri și apartenența la companii.',
        'Date din cataloage și documente: parteneri, poziții, sume și impozite.',
        'Date tehnice: sesiuni, adresa IP și informații despre cereri necesare funcționării și securității, precum și data și versiunea Condițiilor acceptate la intrare.',
      ],
      paragraphs: [
        'Nu încărcați categorii speciale de date sau informații inutile pentru facturare. Interfața actuală nu include formular de plată cu cardul.',
      ],
    },
    {
      heading: '3. Scopuri și temeiuri',
      paragraphs: [
        'Datele contului sunt folosite pentru inițierea și executarea relației cu utilizatorul; contactele reprezentanților organizațiilor, și pentru interesul legitim de administrare a relației, cu respectarea echilibrului drepturilor.',
        'Datele tehnice susțin securitatea și prevenirea abuzurilor pe baza interesului legitim aplicabil. Cerințele legale concrete se întemeiază pe obligația juridică respectivă.',
        'Pentru operațiunile opționale care necesită consimțământ, acesta se solicită separat și poate fi retras fără afectarea prelucrării anterioare legale. Acceptarea Condițiilor nu este acord pentru publicitate.',
        'Clientul stabilește temeiul datelor din documentele sale. Furnizorul le folosește pentru funcțiile solicitate, nu pentru scopuri proprii fără legătură.',
      ],
    },
    {
      heading: '4. Destinatari și transferuri internaționale',
      paragraphs: [
        'Google participă la autentificare și prelucrează date potrivit propriilor condiții. Baza de date a proiectului utilizează Supabase. Accesul furnizorilor de infrastructură este limitat la necesitățile serviciului.',
        'Lista exactă a entităților furnizoare, regiunile, garanțiile contractuale și ștergerea copiilor de siguranță trebuie confirmate înainte de lansarea comercială. Transferurile internaționale necesită temeiurile și garanțiile prevăzute de legislația Republicii Moldova.',
        'Transmiterea către e-Factura are loc numai prin integrarea reală activată. Integrarea de plată și transmiterea documentelor către AI extern nu sunt activate. Existența unei baze tehnice nu constituie transmitere de date.',
        'Divulgarea către autorități se face numai cu temei legal și în volumul necesar. Datele nu sunt vândute ca produs distinct.',
      ],
    },
    {
      heading: '5. Cookie și componente externe',
      paragraphs: [
        'Facturo folosește numai cookie și mecanisme locale fără de care intrarea și interfața nu funcționează: access_token (confirmarea intrării, până la 15 minute), refresh_token (prelungirea intrării, până la 30 de zile, trimis doar către adresele de intrare) și google_nonce (protecția intrării prin Google, până la 10 minute). Niciunul nu este accesibil scripturilor din pagină. În memoria locală a browserului se păstrează marcajul tehnic facturo-session, pentru ca filele deschise să afle despre ieșire sau schimbarea companiei. Componenta Google de autentificare încarcă resurse Google; prelucrarea sa este reglementată și de documentele Google.',
        'Nu folosim cookie de analiză sau publicitate, de aceea nu afișăm o cerere separată de consimțământ pentru ele. Dacă asemenea tehnologii vor fi introduse, informarea și alegerea vor fi oferite înainte de utilizare, când legea o cere. Politica nu constituie ea însăși consimțământ.',
      ],
    },
    {
      heading: '6. Păstrarea datelor',
      paragraphs: [
        'Datele se păstrează numai cât sunt necesare scopului declarat, contractului, unei obligații legale concrete ori apărării justificate a pretențiilor. Conturile, documentele, jurnalele și copiile de siguranță au criterii diferite.',
        'Politica nu stabilește un termen obligatoriu unic pentru toate documentele. Un calendar al duratelor și procedurilor de ștergere trebuie aprobat și publicat înainte de lansarea comercială. Nu se declară ștergerea automată după un termen fix.',
        'Clientul asigură păstrarea obligatorie a propriilor documente contabile. Ștergerea solicitată se examinează ținând cont de drepturile altora și temeiurile legale de păstrare.',
      ],
    },
    {
      heading: '7. Securitate și incidente',
      paragraphs: [
        'Sunt aplicate măsuri de autentificare, control al accesului și protecție a sesiunilor. Securitatea absolută nu este garantată; măsurile trebuie întreținute și verificate în funcție de riscuri.',
        'În cazul unei încălcări, operatorul evaluează consecințele și respectă obligațiile aplicabile de notificare a autorității și persoanelor afectate. Clientului-operator i se oferă asistența necesară.',
      ],
    },
    {
      heading: '8. Drepturi și cereri',
      paragraphs: [
        'În cazurile prevăzute de lege există drepturi la informare și acces, rectificare, ștergere, restricționare, portabilitate, opoziție și retragerea consimțământului. Aplicabilitatea depinde de temei și circumstanțe.',
        'Copia datelor contului — profilul, companiile și rolurile, istoricul intrărilor și evenimentele de securitate — o puteți descărca singur în secțiunea „Setări”. Documentele și cataloagele companiei țin de evidența acesteia: exportul sau ștergerea lor se solicită de proprietarul companiei prin email.',
        'Cererile se trimit la daniilscherbakov1@gmail.com. Poate fi necesară verificarea proporțională a identității sau împuternicirilor. Răspunsul se oferă în termenul legal; prelungirea legală și motivele sunt comunicate solicitantului.',
        'Puteți depune plângere la Centrul Național pentru Protecția Datelor cu Caracter Personal (CNPDCP, datepersonale.md) și vă puteți adresa instanței. Contactarea noastră prealabilă nu este o condiție.',
      ],
    },
    {
      heading: '9. Decizii automate și modificări',
      paragraphs: [
        'Versiunea actuală nu utilizează un model AI extern pentru decizii despre utilizatori sau analiza documentelor. Înainte de schimbarea scopurilor ori destinatarilor se actualizează politica și informările.',
        'Se aplică legislația Republicii Moldova, inclusiv Legea nr. 195/2024. Data versiunii apare la început; modificările esențiale sunt comunicate înainte de prelucrarea nouă.',
      ],
    },
  ],
};
