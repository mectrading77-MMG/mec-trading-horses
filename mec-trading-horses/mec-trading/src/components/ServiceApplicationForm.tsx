"use client";

import { useState } from "react";
import type { Locale } from "@/types/horse";

type Props = { locale: Locale; service: string; serviceTitle: string };
const copy: Record<Locale, Record<string,string>> = {
  en: {name:"Full name",email:"Email",phone:"WhatsApp / Phone",country:"Country",message:"Additional information",send:"Submit application",sending:"Submitting…",success:"Thank you. Your application has been received by MEC HORSES.",error:"We could not submit your application. Please try again.",horse:"Horse name",age:"Horse age / date of birth",breed:"Breed",sex:"Sex",height:"Height (cm)",level:"Current jumping level",rider:"Rider experience",dates:"Preferred dates",goals:"Objectives",history:"Competition history",pedigree:"Sire / Dam",price:"Asking price / price range",location:"Horse location (country / city)",photos:"Photo links",videos:"Video links",xray:"X-ray / veterinary document links",destination:"Destination country",details:"Service requirements",yes:"Yes",no:"No",mare:"Mare",stallion:"Stallion",gelding:"Gelding",other:"Other / not sure",budget:"Budget",discipline:"Discipline / service details",currentOwner:"Are you the owner or authorised representative?",select:"Select an option",contact:"Preferred contact method",emailOption:"Email",whatsappOption:"WhatsApp"},
  fr: {name:"Nom complet",email:"E-mail",phone:"WhatsApp / Téléphone",country:"Pays",message:"Informations complémentaires",send:"Envoyer la demande",sending:"Envoi…",success:"Merci. Votre demande a bien été reçue par MEC HORSES.",error:"Impossible d’envoyer la demande. Veuillez réessayer.",horse:"Nom du cheval",age:"Âge / date de naissance",breed:"Race",sex:"Sexe",height:"Taille (cm)",level:"Niveau actuel en saut d’obstacles",rider:"Expérience du cavalier",dates:"Dates souhaitées",goals:"Objectifs",history:"Historique en compétition",pedigree:"Père / Mère",price:"Prix demandé / fourchette",location:"Localisation du cheval (pays / ville)",photos:"Liens vers les photos",videos:"Liens vers les vidéos",xray:"Liens vers radios / documents vétérinaires",destination:"Pays de destination",details:"Besoins liés au service",yes:"Oui",no:"Non",mare:"Jument",stallion:"Étalon",gelding:"Hongre",other:"Autre / ne sait pas",budget:"Budget",discipline:"Discipline / détails du service",currentOwner:"Êtes-vous propriétaire ou représentant autorisé ?",select:"Choisir une option",contact:"Moyen de contact préféré",emailOption:"E-mail",whatsappOption:"WhatsApp"},
  ar: {name:"الاسم الكامل",email:"البريد الإلكتروني",phone:"واتساب / الهاتف",country:"الدولة",message:"معلومات إضافية",send:"إرسال الطلب",sending:"جارٍ الإرسال…",success:"شكرًا لك. استلمت MEC HORSES طلبك بنجاح.",error:"تعذر إرسال الطلب. يُرجى المحاولة مرة أخرى.",horse:"اسم الحصان",age:"عمر الحصان / تاريخ الميلاد",breed:"السلالة",sex:"الجنس",height:"الارتفاع (سم)",level:"مستوى قفز الحواجز الحالي",rider:"خبرة الفارس",dates:"المواعيد المفضلة",goals:"الأهداف",history:"السجل في المنافسات",pedigree:"الأب / الأم",price:"السعر المطلوب / النطاق السعري",location:"موقع الحصان (الدولة / المدينة)",photos:"روابط الصور",videos:"روابط الفيديو",xray:"روابط الأشعة / المستندات البيطرية",destination:"دولة الوجهة",details:"تفاصيل الخدمة المطلوبة",yes:"نعم",no:"لا",mare:"فرس",stallion:"فحل",gelding:"حصان مخصي",other:"أخرى / غير متأكد",budget:"الميزانية",discipline:"التخصص / تفاصيل الخدمة",currentOwner:"هل أنت المالك أم ممثل مفوض؟",select:"اختر",contact:"طريقة التواصل المفضلة",emailOption:"البريد الإلكتروني",whatsappOption:"واتساب"}
};
const fieldSets: Record<string,string[]> = {
  selection:["budget","level","rider","goals"],
  sales:["horse","age","breed","sex","height","pedigree","level","history","price","location","photos","videos","xray","currentOwner"],
  vetCoordination:["horse","location","dates","details"],
  documentation:["horse","location","destination","details"],
  transport:["horse","location","destination","dates","details"],
  afterSale:["horse","destination","details"],
  trainingCamp:["horse","age","level","rider","dates","goals"],
  valorization:["horse","age","breed","sex","height","pedigree","level","history","goals","photos","videos"]
};
const inputClass="w-full rounded-none border border-charcoal-line bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none";
export default function ServiceApplicationForm({locale,service,serviceTitle}:Props) {
  const t=copy[locale]??copy.en;
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const rtl=locale==="ar";
  async function submit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus("sending");
    const formElement=e.currentTarget;
    const form=new FormData(formElement);
    const entries=Array.from(form.entries()).filter(([k])=>!["name","email","phone","country","preferredContact"].includes(k));
    const detailText=entries.map(([k,v])=>`${k}: ${String(v)}`).join("\n");
    const message=[`Service: ${serviceTitle}`,detailText].filter(Boolean).join("\n\n");
    try {
      const res=await fetch("/api/inquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        name:String(form.get("name")??""),email:String(form.get("email")??""),phone:String(form.get("phone")??""),country:String(form.get("country")??""),
        service, message:message+"\n\n"+String(form.get("message")??""),lookingFor:String(form.get("horse")??""),locale,source:"service-application-page",
        preferredContact:String(form.get("preferredContact")??"email")
      })});
      if(!res.ok) throw new Error("Submission failed");
      setStatus("sent"); formElement.reset();
    } catch { setStatus("error"); }
  }
  if(status==="sent") return <div role="status" className="border border-hunter bg-hunter/5 p-7 text-center text-sm text-hunter">{t.success}</div>;
  return <form onSubmit={submit} dir={rtl?"rtl":"ltr"} className="grid gap-5">
    <div className="grid gap-4 sm:grid-cols-2">
      <input className={inputClass} name="name" required placeholder={t.name}/>
      <input className={inputClass} name="email" type="email" required placeholder={t.email}/>
      <input className={inputClass} name="phone" required placeholder={t.phone}/>
      <input className={inputClass} name="country" required placeholder={t.country}/>
    </div>
    <div className="border-t border-charcoal-line pt-5">
      <p className="mb-4 font-display text-lg italic text-charcoal">{serviceTitle}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {(fieldSets[service]??["details"]).map((field)=>{
          const isLong=["goals","history","photos","videos","xray","details"].includes(field);
          const isSelect=field==="sex"||field==="currentOwner";
          return <label key={field} className={isLong?"sm:col-span-2 grid gap-2 text-xs text-charcoal/70":"grid gap-2 text-xs text-charcoal/70"}>
            <span>{t[field]??field}</span>
            {isSelect?<select name={field} className={inputClass} defaultValue=""><option value="">{t.select}</option>{(field==="sex"?[["mare",t.mare],["stallion",t.stallion],["gelding",t.gelding],["other",t.other]]:[["yes",t.yes],["no",t.no]]).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>
            :isLong?<textarea name={field} rows={field==="details"||field==="goals"?3:2} className={inputClass} placeholder={t[field]}/>
            :<input name={field} className={inputClass} placeholder={t[field]??field} type={field==="dates"?"text":"text"}/>}
          </label>;
        })}
      </div>
    </div>
    <label className="grid gap-2 text-xs text-charcoal/70"><span>{t.message}</span><textarea name="message" rows={4} className={inputClass}/></label>
    <label className="grid gap-2 text-xs text-charcoal/70"><span>{t.contact}</span><select name="preferredContact" className={inputClass} defaultValue="email"><option value="email">{t.emailOption}</option><option value="whatsapp">{t.whatsappOption}</option></select></label>
    {status==="error"&&<p role="alert" className="text-sm text-red-700">{t.error}</p>}
    <button disabled={status==="sending"} className="w-full bg-charcoal px-6 py-4 font-mono text-[11px] uppercase tracking-[.18em] text-white transition-colors hover:bg-gold disabled:opacity-50">{status==="sending"?t.sending:t.send}</button>
  </form>;
}
