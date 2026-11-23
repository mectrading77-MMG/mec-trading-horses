import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import { localizedAlternates } from "@/lib/seo";
import ServiceApplicationForm from "@/components/ServiceApplicationForm";

const CONTENT: Record<string, Record<Locale,{title:string;intro:string;description:string;benefits:string[]}>> = {
 selection:{
  en:{title:"Horse Purchase",intro:"Find the right horse for your ambitions.",description:"A considered search for a show-jumping horse matched to your riding level, sporting goals, experience and budget. Share your requirements and our team will help identify suitable opportunities.",benefits:["A clear brief based on your goals and budget","Shortlisted horses and relevant information","Guidance through enquiries, viewings and next steps"]},
  fr:{title:"Achat de cheval",intro:"Trouvez le cheval adapté à vos ambitions.",description:"Une recherche réfléchie d’un cheval de saut d’obstacles correspondant à votre niveau, vos objectifs sportifs, votre expérience et votre budget. Présentez-nous vos critères afin que notre équipe identifie des opportunités adaptées.",benefits:["Un cahier des charges défini selon vos objectifs et votre budget","Une sélection de chevaux et leurs informations utiles","Un accompagnement pour les demandes, visites et étapes suivantes"]},
  ar:{title:"شراء خيل",intro:"اعثر على الحصان المناسب لطموحاتك.",description:"بحث مدروس عن حصان قفز حواجز يتناسب مع مستواك وأهدافك الرياضية وخبرتك وميزانيتك. شاركنا متطلباتك ليساعدك فريقنا في تحديد الخيارات المناسبة.",benefits:["تحديد المتطلبات وفق أهدافك وميزانيتك","ترشيح خيول ومشاركة المعلومات المهمة","مرافقتك في الاستفسارات والمعاينات والخطوات التالية"]}
 },
 sales:{
  en:{title:"Sell Your Horse",intro:"Your horse deserves the right exposure.",description:"MEC HORSES helps owners present and promote their sport horses to a relevant international audience. We review each submission, prepare a professional presentation and connect suitable enquiries with the owner. Submitting this form is a request for review, not automatic publication or a guarantee of sale.",benefits:["Professional horse profile using the information and media you provide","Targeted exposure through MEC HORSES channels and equestrian network","Enquiry handling and coordination of viewings and sale discussions"]},
  fr:{title:"Vendez votre cheval",intro:"Votre cheval mérite une visibilité adaptée.",description:"MEC HORSES accompagne les propriétaires dans la présentation et la promotion de leurs chevaux de sport auprès d’un public international pertinent. Nous étudions chaque dossier, préparons une présentation professionnelle et transmettons les demandes adaptées au propriétaire. L’envoi du formulaire constitue une demande d’étude, sans publication automatique ni garantie de vente.",benefits:["Création d’un profil professionnel à partir de vos informations et médias","Visibilité ciblée via les canaux MEC HORSES et notre réseau équestre","Gestion des demandes et coordination des visites et échanges de vente"]},
  ar:{title:"اعرض حصانك للبيع",intro:"حصانك يستحق الظهور أمام المشترين المناسبين.",description:"تساعد MEC HORSES الملاك على تقديم خيولهم الرياضية والترويج لها أمام جمهور دولي مناسب. نراجع كل طلب، ونجهز عرضًا احترافيًا، ونتواصل مع المهتمين المناسبين بالتنسيق مع المالك. إرسال النموذج هو طلب للمراجعة وليس نشرًا تلقائيًا أو ضمانًا للبيع.",benefits:["إعداد ملف احترافي للحصان باستخدام المعلومات والوسائط المقدمة","ترويج موجه عبر قنوات MEC HORSES وشبكتنا في مجال الفروسية","متابعة الاستفسارات وتنسيق المعاينات ومناقشات البيع"]}
 },
 vetCoordination:{
  en:{title:"Veterinary Coordination",intro:"Keep the veterinary process organised.",description:"We coordinate clinic communication, appointments, travel arrangements and the exchange of relevant veterinary documents around your schedule.",benefits:["Clinic and practitioner coordination","Appointment and travel planning","Organised document exchange"]},
  fr:{title:"Coordination vétérinaire",intro:"Un suivi vétérinaire organisé.",description:"Nous coordonnons les échanges avec les cliniques, les rendez-vous, les déplacements et la transmission des documents vétérinaires selon votre planning.",benefits:["Coordination avec les cliniques et praticiens","Planification des rendez-vous et déplacements","Transmission organisée des documents"]},
  ar:{title:"تنسيق بيطري",intro:"تنظيم جميع الخطوات البيطرية.",description:"ننسق التواصل مع العيادات والمواعيد والتنقلات وتبادل المستندات البيطرية ذات الصلة وفق جدولك.",benefits:["التنسيق مع العيادات والأطباء","تخطيط المواعيد والتنقلات","تنظيم تبادل المستندات"]}
 },
 documentation:{
  en:{title:"Documentation",intro:"Keep the paperwork clear and complete.",description:"We assist with the practical documentation involved in a horse transaction, such as passports, registration details and ownership-transfer steps, subject to the relevant authorities.",benefits:["Review of available horse documents","Guidance on registration and ownership transfer","Coordination of missing information"]},
  fr:{title:"Documentation",intro:"Des documents clairs et complets.",description:"Nous vous accompagnons dans les démarches documentaires liées à une transaction équine : passeport, informations d’identification et étapes de changement de propriétaire, selon les autorités compétentes.",benefits:["Vérification des documents disponibles","Conseils sur l’identification et le changement de propriétaire","Coordination des informations manquantes"]},
  ar:{title:"الوثائق",intro:"ملف مستندات واضح ومكتمل.",description:"نساعدك في الجوانب العملية للمستندات المرتبطة بمعاملة الحصان، مثل جواز السفر وبيانات التسجيل وخطوات نقل الملكية، وفق متطلبات الجهات المختصة.",benefits:["مراجعة المستندات المتاحة","إرشادات التسجيل ونقل الملكية","تنسيق المعلومات الناقصة"]}
 },
 transport:{
  en:{title:"International Transport",intro:"Plan your horse’s journey with care.",description:"We help coordinate suitable road or air transport options, timing and communication with transport providers for domestic and international journeys.",benefits:["Transport requirements and route planning","Coordination with transport providers","Updates on timing and required documents"]},
  fr:{title:"Transport international",intro:"Organisez le déplacement de votre cheval avec soin.",description:"Nous vous aidons à coordonner des solutions de transport routier ou aérien, les délais et les échanges avec les transporteurs pour les trajets nationaux et internationaux.",benefits:["Définition des besoins et itinéraires","Coordination avec les transporteurs","Suivi des délais et documents nécessaires"]},
  ar:{title:"النقل الدولي",intro:"خطط لرحلة حصانك بعناية.",description:"نساعدك في تنسيق خيارات النقل البري أو الجوي المناسبة والمواعيد والتواصل مع شركات النقل للرحلات المحلية والدولية.",benefits:["تحديد متطلبات النقل والمسار","التنسيق مع شركات النقل","متابعة المواعيد والمستندات المطلوبة"]}
 },
 afterSale:{
  en:{title:"After-Sale Support",intro:"Our assistance continues after the sale.",description:"We remain available after the horse changes hands to help coordinate follow-up questions and practical arrangements connected with the transaction.",benefits:["A point of contact after completion","Help coordinating follow-up arrangements","Support with practical questions"]},
  fr:{title:"Suivi après-vente",intro:"Notre accompagnement se poursuit après la vente.",description:"Nous restons disponibles après le transfert du cheval afin de coordonner les questions de suivi et les démarches pratiques liées à la transaction.",benefits:["Un interlocuteur après la finalisation","Aide à la coordination des démarches","Réponses aux questions pratiques"]},
  ar:{title:"دعم ما بعد البيع",intro:"تستمر مساعدتنا بعد إتمام البيع.",description:"نبقى متاحين بعد انتقال ملكية الحصان للمساعدة في تنسيق الاستفسارات اللاحقة والترتيبات العملية المرتبطة بالصفقة.",benefits:["جهة تواصل بعد إتمام الصفقة","المساعدة في تنسيق الترتيبات اللاحقة","دعم في الأسئلة العملية"]}
 },
 trainingCamp:{
  en:{title:"Training Camp",intro:"Build confidence, consistency and performance.",description:"A structured training programme for horses and riders, with sessions adapted to current ability, technical priorities and competition ambitions. Share your preferred dates and objectives so we can discuss a suitable programme.",benefits:["Training plan matched to horse and rider level","Focused jumping and flatwork sessions","Preparation goals and progress discussion"]},
  fr:{title:"Stage d’entraînement",intro:"Développez confiance, régularité et performance.",description:"Un programme structuré pour les chevaux et les cavaliers, avec des séances adaptées au niveau, aux priorités techniques et aux objectifs de compétition. Indiquez vos dates et objectifs pour étudier un programme adapté.",benefits:["Programme adapté au niveau du cheval et du cavalier","Séances ciblées de saut et de travail sur le plat","Objectifs de préparation et suivi des progrès"]},
  ar:{title:"معسكر تدريبي",intro:"طوّر الثقة والثبات والأداء.",description:"برنامج تدريبي منظم للخيول والفرسان، بجلسات تتناسب مع المستوى الحالي والأولويات الفنية وطموحات المنافسة. شاركنا المواعيد والأهداف لمناقشة البرنامج الأنسب.",benefits:["خطة تدريب تناسب مستوى الحصان والفارس","جلسات مركزة للقفز والعمل على الأرض","مناقشة أهداف الإعداد والتقدم"]}
 },
 valorization:{
  en:{title:"Horse Valorization",intro:"Develop your horse’s potential and presentation.",description:"A tailored programme to develop a horse’s sporting qualities and present them more effectively to the market through training priorities, performance planning and professional media.",benefits:["Assessment of sporting profile and objectives","Development and competition-preparation priorities","Improved presentation for potential buyers"]},
  fr:{title:"Valorisation du cheval",intro:"Développez le potentiel et la présentation de votre cheval.",description:"Un programme adapté pour développer les qualités sportives du cheval et mieux les présenter au marché grâce aux priorités de travail, à la préparation sportive et à des supports professionnels.",benefits:["Évaluation du profil sportif et des objectifs","Priorités de développement et de préparation en compétition","Présentation améliorée auprès d’acheteurs potentiels"]},
  ar:{title:"تطوير وتسويق الخيل",intro:"طوّر إمكانات حصانك وطريقة تقديمه.",description:"برنامج مخصص لتطوير الصفات الرياضية للحصان وتقديمها بصورة أفضل للسوق من خلال تحديد أولويات التدريب والتخطيط للمنافسات وإعداد مواد عرض احترافية.",benefits:["تقييم الملف الرياضي والأهداف","تحديد أولويات التطوير والاستعداد للمنافسات","تحسين طريقة العرض للمشترين المحتملين"]}
 }
};
const KEYS=Object.keys(CONTENT);
export async function generateStaticParams(){return KEYS.map(slug=>({slug}));}
export async function generateMetadata({params}:{params:{locale:Locale;slug:string}}):Promise<Metadata>{
 const item=CONTENT[params.slug]?.[params.locale]??CONTENT[params.slug]?.en;
 if(!item) return {};
 return {title:`${item.title} | MEC HORSES`,description:item.description,alternates:localizedAlternates(params.locale,`/services/${params.slug}`)};
}
export default async function ServiceDetailPage({params}:{params:{locale:Locale;slug:string}}){
 const item=CONTENT[params.slug]?.[params.locale]??CONTENT[params.slug]?.en;
 if(!item) notFound();
 const dict=await getDictionary(params.locale);
 return <main className="mx-auto max-w-editorial px-6 py-14 lg:px-10" dir={params.locale==="ar"?"rtl":"ltr"}>
  <Link href={`/${params.locale}/services`} className="font-mono text-[10px] uppercase tracking-[.18em] text-charcoal/50 hover:text-gold">← {dict.services.title}</Link>
  <section className="mt-8 border-y border-charcoal-line py-12 lg:py-16">
   <p className="font-mono text-[10px] uppercase tracking-[.2em] text-gold">MEC HORSES · {dict.services.title}</p>
   <h1 className="mt-4 max-w-3xl font-display text-4xl italic leading-tight text-charcoal md:text-6xl">{item.title}</h1>
   <p className="mt-5 max-w-2xl text-lg text-charcoal/70">{item.intro}</p>
   <p className="mt-7 max-w-3xl leading-8 text-charcoal/70">{item.description}</p>
   <ul className="mt-8 grid gap-3 md:grid-cols-3">{item.benefits.map((benefit)=><li key={benefit} className="border-t border-charcoal-line pt-4 text-sm leading-6 text-charcoal/75">— {benefit}</li>)}</ul>
  </section>
  <section id="application" className="grid gap-10 py-14 lg:grid-cols-[.8fr_1.2fr]">
   <div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-gold">{params.locale==="ar"?"طلب الخدمة":params.locale==="fr"?"Demande de service":"Service application"}</p><h2 className="mt-3 font-display text-3xl italic text-charcoal">{params.locale==="ar"?"أخبرنا بتفاصيل طلبك":params.locale==="fr"?"Parlez-nous de votre projet":"Tell us about your requirements"}</h2><p className="mt-4 text-sm leading-7 text-charcoal/60">{params.locale==="ar"?"املأ النموذج التالي وسيتواصل معك فريق MEC HORSES.":params.locale==="fr"?"Remplissez le formulaire ; l’équipe MEC HORSES vous recontactera.":"Complete the form and the MEC HORSES team will get back to you."}</p></div>
   <div className="border border-charcoal-line p-6 md:p-8"><ServiceApplicationForm locale={params.locale} service={params.slug} serviceTitle={item.title}/></div>
  </section>
 </main>;
}
