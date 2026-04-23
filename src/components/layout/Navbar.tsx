"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
const navItems = [
  { href: "/servizi", label: "Servizi" },
  { href: "/agente-ai", label: "Agente AI" },
  { href: "/casi-studio", label: "Casi Studio" },
  { href: "/contatti", label: "Contatti" },
  { href: "/chi-siamo", label: "Chi Siamo" },
];
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
  useEffect(() => {
    const check = () => { setIsDesktop(window.innerWidth >= 768); if (window.innerWidth >= 768) setIsOpen(false); };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (
    <>
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 5vw",height:"64px",
        transition:"background .3s, border-color .3s",
        background: scrolled ? "rgba(13,15,20,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      }}>
        <Link href="/" style={{fontWeight:600,fontSize:"15px",letterSpacing:"-0.01em",textDecoration:"none",lineHeight:1}}>
          <span style={{color:"#F4F3EE"}}>Freyr</span>
          <span style={{color:"#4B6BFB"}}>work</span>
        </Link>
        <div style={{display:isDesktop?"flex":"none",gap:"28px",alignItems:"center"}}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              style={{fontSize:"13px",color:pathname===item.href?"#F4F3EE":"rgba(244,243,238,0.45)",textDecoration:"none",transition:"color .2s"}}
              onMouseEnter={(e)=>{e.currentTarget.style.color="#F4F3EE";}}
              onMouseLeave={(e)=>{e.currentTarget.style.color=pathname===item.href?"#F4F3EE":"rgba(244,243,238,0.45)";}}
            >{item.label}</Link>
          ))}
        </div>
        <button onClick={()=>setIsOpen((o)=>!o)} style={{display:isDesktop?"none":"flex",alignItems:"center",justifyContent:"center",width:"40px",height:"40px",background:"transparent",border:"none",color:"#F4F3EE",cursor:"pointer"}}>
          {isOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{opacity:0,y:-24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-24}} transition={{duration:0.28,ease:[0.22,1,0.36,1]}}
            style={{position:"fixed",inset:0,zIndex:90,background:"rgba(13,15,20,0.98)",backdropFilter:"blur(18px)",display:"flex",flexDirection:"column",paddingTop:"64px"}}>
            <div style={{display:"flex",flex:1,flexDirection:"column",justifyContent:"center",padding:"0 5vw",gap:"32px"}}>
              {navItems.map((item,i)=>(
                <motion.div key={item.href} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{delay:0.04*i,duration:0.24}}>
                  <Link href={item.href} onClick={()=>setIsOpen(false)} style={{color:"#F4F3EE",fontSize:"32px",fontWeight:600,letterSpacing:"-0.03em",textDecoration:"none",display:"block"}}>{item.label}</Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
