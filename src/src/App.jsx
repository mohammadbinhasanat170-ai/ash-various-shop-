import { useState, useRef, useEffect } from "react";

const ALL_PRODUCTS = [
  { id:1,  name:"Wireless ANC Headphones", emoji:"🎧", type:"physical", price:79.99,  desc:"Premium over-ear, 40hr battery & noise cancellation.", tag:"Best Seller" },
  { id:2,  name:"Mechanical Keyboard",     emoji:"⌨️", type:"physical", price:119.99, desc:"TKL layout, RGB backlight, tactile brown switches.", tag:null },
  { id:3,  name:"Smart Watch Series X",    emoji:"⌚", type:"physical", price:199.99, desc:"Health tracking, GPS, 7-day battery, water resistant.", tag:"New" },
  { id:4,  name:"Gaming Mouse Pro",        emoji:"🖱️", type:"physical", price:59.99,  desc:"16000 DPI, 7 programmable buttons, RGB lighting.", tag:null },
  { id:5,  name:"Portable SSD 1TB",        emoji:"💾", type:"physical", price:89.99,  desc:"USB-C, 1050MB/s read speed, shock resistant casing.", tag:null },
  { id:6,  name:"UI Design Kit (Figma)",   emoji:"🎨", type:"digital",  price:29.99,  desc:"200+ components, 50 templates. Instant download.", tag:"Popular" },
  { id:7,  name:"Python Mastery Course",   emoji:"🐍", type:"digital",  price:49.99,  desc:"15 hrs of video, source code & lifetime access.", tag:"Hot" },
  { id:8,  name:"Photo Preset Pack (LR)",  emoji:"📸", type:"digital",  price:19.99,  desc:"80 Lightroom presets. One-click cinematic looks.", tag:null },
  { id:9,  name:"Notion Productivity OS",  emoji:"📋", type:"digital",  price:24.99,  desc:"All-in-one Notion dashboard: tasks, goals, habits.", tag:"New" },
  { id:10, name:"Logo Design Bundle",      emoji:"✏️", type:"digital",  price:34.99,  desc:"500 vector logo templates, fully editable in AI.", tag:null },
  { id:11, name:"Sound FX Pack (500+)",    emoji:"🎵", type:"digital",  price:14.99,  desc:"500+ royalty-free sound effects for content creators.", tag:"Popular" },
  { id:12, name:"Resume Template Kit",     emoji:"📄", type:"digital",  price:9.99,   desc:"10 ATS-friendly Word & PDF resume templates.", tag:null },
  { id:13, name:"Stock Photo Bundle",      emoji:"🖼️", type:"digital",  price:39.99,  desc:"1000 high-res commercial-use stock photos.", tag:null },
  { id:14, name:"Social Media Kit",        emoji:"📱", type:"digital",  price:17.99,  desc:"300 Canva templates for IG, TikTok, Twitter & more.", tag:"Hot" },
];

const c = {
  ink:"#0f0f0f", paper:"#f8f6f3", accent:"#ff4f1f", blue:"#2563eb",
  muted:"#71717a", card:"#fff", border:"#e4e4e7", green:"#16a34a",
  purple:"#7c3aed",
};

const USERS = {};

export default function App() {
  const [authPage, setAuthPage] = useState("login");
  const [user, setUser] = useState(null);
  if (!user) return <AuthScreen page={authPage} setPage={setAuthPage} onLogin={setUser} />;
  return <ShopAI user={user} onLogout={()=>setUser(null)} />;
}

function AuthScreen({ page, setPage, onLogin }) {
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const isLogin = page === "login";
  function upd(k){ return e => { setForm(f=>({...f,[k]:e.target.value})); setErr(""); }; }

  async function submit() {
    setErr("");
    if (!form.email || !form.password) { setErr("Please fill all fields."); return; }
    if (!isLogin && !form.name) { setErr("Please enter your name."); return; }
    if (!isLogin && form.password !== form.confirm) { setErr("Passwords don't match."); return; }
    if (!isLogin && form.password.length < 6) { setErr("Password must be 6+ chars."); return; }
    setLoading(true);
    await new Promise(r=>setTimeout(r,900));
    if (isLogin) {
      const u = USERS[form.email];
      if (!u || u.password !== form.password) { setErr("Incorrect email or password."); setLoading(false); return; }
      onLogin(u);
    } else {
      if (USERS[form.email]) { setErr("Account already exists. Please log in."); setLoading(false); return; }
      const u = { name: form.name, email: form.email, password: form.password };
      USERS[form.email] = u;
      onLogin(u);
    }
    setLoading(false);
  }

  function demoLogin() {
    const demo = { name:"Demo User", email:"demo@shvariousshop.com", password:"demo123" };
    USERS["demo@shvariousshop.com"] = demo;
    onLogin(demo);
  }

  const S = {
    page:{ minHeight:"100vh", background:`linear-gradient(135deg,#0f0f1a 0%,#1a1a2e 50%,#0f172a 100%)`,
      display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem", fontFamily:"'Inter',system-ui,sans-serif" },
    card:{ background:"#fff", borderRadius:24, padding:"2.2rem", width:"100%", maxWidth:420, boxShadow:"0 24px 80px rgba(0,0,0,.35)" },
    brand:{ textAlign:"center", marginBottom:"1.8rem" },
    brandLogo:{ fontSize:"2.2rem", marginBottom:8 },
    brandName:{ fontWeight:800, fontSize:"1.3rem", letterSpacing:"-0.5px", color:c.ink },
    brandSub:{ fontSize:"0.78rem", color:c.muted, marginTop:4 },
    tabs:{ display:"flex", background:"#f4f4f5", borderRadius:12, padding:4, marginBottom:"1.6rem" },
    tab:(active)=>({ flex:1, padding:"8px 0", border:"none", borderRadius:9, fontWeight:600, fontSize:"0.85rem", cursor:"pointer",
      background:active?"#fff":"transparent", color:active?c.ink:c.muted, boxShadow:active?"0 2px 8px rgba(0,0,0,.08)":"none" }),
    fGroup:{ marginBottom:"0.95rem" },
    fLabel:{ display:"block", fontSize:"0.72rem", fontWeight:600, color:c.muted, textTransform:"uppercase", letterSpacing:.5, marginBottom:5 },
    fInput:{ width:"100%", padding:"10px 14px", border:`1.5px solid ${c.border}`, borderRadius:10, fontSize:"0.9rem",
      outline:"none", boxSizing:"border-box", fontFamily:"inherit" },
    err:{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:10, padding:"8px 12px", fontSize:"0.8rem", color:"#dc2626", marginBottom:"1rem" },
    btn:(l)=>({ width:"100%", padding:"11px", background:l?c.muted:c.blue, color:"#fff", border:"none", borderRadius:12,
      fontSize:"0.95rem", fontWeight:700, cursor:l?"not-allowed":"pointer", fontFamily:"inherit" }),
    divider:{ display:"flex", alignItems:"center", gap:8, margin:"1.1rem 0", color:c.muted, fontSize:"0.75rem" },
    divLine:{ flex:1, height:1, background:c.border },
    demoBtn:{ width:"100%", padding:"10px", background:"transparent", border:`1.5px solid ${c.border}`,
      borderRadius:12, fontSize:"0.85rem", fontWeight:600, cursor:"pointer", color:c.ink, fontFamily:"inherit", marginTop:8 },
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.brand}>
          <div style={S.brandLogo}>🛍️</div>
          <div style={S.brandName}><span style={{color:c.accent}}>SH</span> Various Shop</div>
          <div style={S.brandSub}>{isLogin?"Welcome back! Sign in to continue.":"Create your account to start shopping."}</div>
        </div>
        <div style={S.tabs}>
          <button style={S.tab(!isLogin)} onClick={()=>{setPage("login");setErr("");}}>Sign In</button>
          <button style={S.tab(isLogin)} onClick={()=>{setPage("signup");setErr("");}}>Sign Up</button>
        </div>
        {!isLogin&&<div style={S.fGroup}><label style={S.fLabel}>Full Name</label>
          <input style={S.fInput} placeholder="Jane Smith" value={form.name} onChange={upd("name")}/></div>}
        <div style={S.fGroup}><label style={S.fLabel}>Email Address</label>
          <input style={S.fInput} type="email" placeholder="jane@example.com" value={form.email} onChange={upd("email")}
            onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
        <div style={S.fGroup}><label style={S.fLabel}>Password</label>
          <input style={S.fInput} type="password" placeholder={isLogin?"Your password":"Min. 6 characters"} value={form.password} onChange={upd("password")}
            onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
        {!isLogin&&<div style={S.fGroup}><label style={S.fLabel}>Confirm Password</label>
          <input style={S.fInput} type="password" placeholder="Repeat password" value={form.confirm} onChange={upd("confirm")}
            onKeyDown={e=>e.key==="Enter"&&submit()}/></div>}
        {err&&<div style={S.err}>⚠️ {err}</div>}
        <button style={S.btn(loading)} disabled={loading} onClick={submit}>
          {loading?"Please wait…":isLogin?"Sign In →":"Create Account →"}
        </button>
        <div style={S.divider}><div style={S.divLine}/>or<div style={S.divLine}/></div>
        <button style={S.demoBtn} onClick={demoLogin}>👤 Continue as Guest</button>
      </div>
    </div>
  );
}
function ShopAI({ user, onLogout }) {
  const [filter, setFilter] = useState("all");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [step, setStep] = useState("form");
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMsgs, setAiMsgs] = useState([{ role:"bot", text:`Hi ${user.name.split(" ")[0]}! 👋 I'm your AI shopping assistant. Ask me about any product!` }]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [addedIds, setAddedIds] = useState({});
  const [form, setForm] = useState({ name:user.name, email:user.email, address:"", city:"", zip:"", card:"", expiry:"", cvv:"" });
  const [paying, setPaying] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const aiBoxRef = useRef();
  const toastTimer = useRef();

  const products = filter==="all" ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p=>p.type===filter);
  const cartItems = Object.values(cart);
  const cartCount = cartItems.reduce((s,i)=>s+i.qty,0);
  const cartTotal = cartItems.reduce((s,i)=>s+i.price*i.qty,0);
  const hasPhysical = cartItems.some(i=>i.type==="physical");

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(()=>setToast(null), 2500);
  }

  function addToCart(id) {
    const p = ALL_PRODUCTS.find(x=>x.id===id);
    setCart(prev=>({...prev,[id]:prev[id]?{...prev[id],qty:prev[id].qty+1}:{...p,qty:1}}));
    setAddedIds(a=>({...a,[id]:true}));
    setTimeout(()=>setAddedIds(a=>({...a,[id]:false})),1400);
    showToast(`${p.emoji} Added to cart!`);
  }

  function changeQty(id, delta) {
    setCart(prev=>{
      const n={...prev};
      if(!n[id]) return n;
      n[id]={...n[id],qty:n[id].qty+delta};
      if(n[id].qty<=0) delete n[id];
      return n;
    });
  }

  function formatCard(v){ return v.replace(/\D/g,"").substring(0,16).replace(/(.{4})/g,"$1 ").trim(); }

  async function processPayment() {
    if (!form.name||!form.email||!form.card){ showToast("⚠️ Fill all required fields"); return; }
    if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(form.email)){ showToast("⚠️ Enter a valid email"); return; }
    setPaying(true);
    const num  = "ORD-"+Math.random().toString(36).substring(2,8).toUpperCase();
    const date = new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
    const itemsText = cartItems.map(i=>`${i.emoji} ${i.name} x${i.qty} — $${(i.price*i.qty).toFixed(2)}`).join("\n");
    const shippingNote = hasPhysical
      ? `Shipping to: ${form.address}, ${form.city} ${form.zip}`
      : "Digital products — instant access, no shipping needed.";
    const EMAILJS_PUBLIC_KEY = "dEX9I4dPZSEesFsW7";
    const EMAILJS_SERVICE_ID = "service_8t2vm9e";
    const BUYER_TEMPLATE_ID  = "template_7ks9p2j";
    const OWNER_TEMPLATE_ID  = "template_uwgbnqg";
    const params = {
      order_number: num, order_date: date,
      buyer_name: form.name, buyer_email: form.email,
      order_items: itemsText, order_total: `$${cartTotal.toFixed(2)}`,
      shipping_address: hasPhysical?`${form.address}, ${form.city} ${form.zip}`:"N/A — Digital Product",
      shipping_note: shippingNote,
    };
    try {
      if (!window.emailjs) {
        await new Promise((res,rej)=>{
          const sc = document.createElement("script");
          sc.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
          sc.onload=res; sc.onerror=rej;
          document.head.appendChild(sc);
        });
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      }
      await window.emailjs.send(EMAILJS_SERVICE_ID, BUYER_TEMPLATE_ID, params);
      await window.emailjs.send(EMAILJS_SERVICE_ID, OWNER_TEMPLATE_ID, params);
      showToast("📧 Order confirmation email sent!");
    } catch(e) {
      console.error("EmailJS error:",e);
      showToast("⚠️ Email failed — but order is recorded!");
    }
    setOrderInfo({ num, date, name:form.name, email:form.email, items:[...cartItems], total:cartTotal });
    setCart({});
    setPaying(false);
    setStep("success");
  }

  async function sendAI() {
    const msg = aiInput.trim();
    if (!msg||aiLoading) return;
    setAiInput("");
    setAiMsgs(m=>[...m,{role:"user",text:msg}]);
    setAiLoading(true);
    const list = ALL_PRODUCTS.map(p=>`- ${p.name} (${p.type}, $${p.price}): ${p.desc}`).join("\n");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000,
          system:`You are a friendly AI shopping assistant for SH Various Shop. User: ${user.name}. Products:\n${list}\nBe concise, helpful, friendly.`,
          messages:[{role:"user",content:msg}] })
      });
      const data = await res.json();
      setAiMsgs(m=>[...m,{role:"bot",text:data.content?.[0]?.text||"Sorry, try again!"}]);
    } catch {
      setAiMsgs(m=>[...m,{role:"bot",text:"Connection issue, please try again!"}]);
    }
    setAiLoading(false);
  }

  useEffect(()=>{ if(aiBoxRef.current) aiBoxRef.current.scrollTop=aiBoxRef.current.scrollHeight; },[aiMsgs,aiLoading]);

  const S = {
    wrap:{ fontFamily:"'Inter',system-ui,sans-serif", background:c.paper, minHeight:"100vh", color:c.ink },
    nav:{ position:"sticky", top:0, zIndex:100, height:60, display:"flex", alignItems:"center",
      justifyContent:"space-between", padding:"0 1.5rem",
      background:"rgba(248,246,243,.95)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${c.border}` },
    logo:{ fontWeight:800, fontSize:"1.2rem", letterSpacing:"-0.5px" },
    navRight:{ display:"flex", alignItems:"center", gap:10 },
    cartBtn:{ display:"flex", alignItems:"center", gap:6, background:c.ink, color:"#fff",
      border:"none", borderRadius:50, padding:"7px 14px", fontSize:"0.82rem", fontWeight:600, cursor:"pointer" },
    cartBadge:{ background:c.accent, color:"#fff", borderRadius:"50%", width:20, height:20,
      fontSize:"0.65rem", fontWeight:700, display:"inline-flex", alignItems:"center", justifyContent:"center" },
    userBtn:{ display:"flex", alignItems:"center", gap:6, background:"#f4f4f5",
      border:`1px solid ${c.border}`, borderRadius:50, padding:"6px 12px",
      fontSize:"0.8rem", fontWeight:600, cursor:"pointer", position:"relative" },
    avatar:{ width:26, height:26, borderRadius:"50%", background:c.blue, color:"#fff",
      display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:"0.72rem", fontWeight:700 },
    dropdown:{ position:"absolute", top:"calc(100% + 8px)", right:0, background:"#fff",
      border:`1px solid ${c.border}`, borderRadius:12, minWidth:180,
      boxShadow:"0 8px 30px rgba(0,0,0,.12)", zIndex:999, overflow:"hidden" },
    ddItem:(danger)=>({ display:"block", width:"100%", padding:"10px 14px", border:"none",
      background:"none", textAlign:"left", fontSize:"0.83rem", fontWeight:500,
      color:danger?"#dc2626":c.ink, cursor:"pointer" }),
    hero:{ background:`linear-gradient(135deg,#0f0f1a,#1e1b4b)`, color:"#fff",
      padding:"3rem 1.5rem 2.5rem", textAlign:"center" },
    heroBadge:{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,.12)",
      borderRadius:50, padding:"4px 14px", fontSize:"0.72rem", fontWeight:600, marginBottom:14,
      border:"1px solid rgba(255,255,255,.2)" },
    heroDot:{ width:7, height:7, background:"#4ade80", borderRadius:"50%" },
    heroH1:{ fontWeight:800, fontSize:"clamp(1.8rem,5vw,3rem)", letterSpacing:"-1px", lineHeight:1.08, margin:"0 0 1rem" },
    heroSub:{ fontSize:"0.9rem", opacity:.7, maxWidth:480, margin:"0 auto 1.5rem" },
    heroStats:{ display:"flex", justifyContent:"center", gap:"2rem", flexWrap:"wrap" },
    heroStat:{ textAlign:"center" },
    heroStatNum:{ fontWeight:800, fontSize:"1.4rem" },
    heroStatLbl:{ fontSize:"0.7rem", opacity:.6 },
    filterBar:{ display:"flex", gap:8, justifyContent:"center", padding:"1.2rem 1.5rem .5rem", flexWrap:"wrap" },
    filterBtn:(active)=>({ padding:"7px 18px", border:`1.5px solid ${active?c.blue:c.border}`,
      borderRadius:50, fontSize:"0.8rem", fontWeight:600, cursor:"pointer",
      background:active?c.blue:"#fff", color:active?"#fff":c.muted }),
    section:{ maxWidth:1080, margin:"0 auto", padding:"1rem 1.5rem 3rem" },
    sHead:{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.2rem" },
    sTitle:{ fontWeight:700, fontSize:"1.3rem", letterSpacing:"-0.4px" },
    sCount:{ fontSize:"0.78rem", color:c.muted },
    grid:{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:"1rem" },
    card:{ background:c.card, border:`1px solid ${c.border}`, borderRadius:14, overflow:"hidden",
      transition:"transform .2s,box-shadow .2s", position:"relative" },
    cardImg:{ height:130, display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:"2.8rem", position:"relative", background:"linear-gradient(135deg,#f8f6f3,#f0eee9)" },
    typeBadge:(type)=>({ position:"absolute", top:8, left:8, fontSize:"0.58rem", fontWeight:700,
      letterSpacing:.5, textTransform:"uppercase", padding:"3px 8px", borderRadius:50,
      background:type==="digital"?"#eff6ff":"#fff7ed", color:type==="digital"?c.blue:c.accent,
      border:`1px solid ${type==="digital"?"#bfdbfe":"#fed7aa"}` }),
    tagBadge:{ position:"absolute", top:8, right:8, fontSize:"0.58rem", fontWeight:700,
      padding:"3px 8px", borderRadius:50, background:c.purple, color:"#fff" },
    cardBody:{ padding:"0.85rem" },
    cardName:{ fontWeight:700, fontSize:"0.88rem", marginBottom:3 },
    cardDesc:{ fontSize:"0.73rem", color:c.muted, lineHeight:1.5, marginBottom:"0.7rem" },
    cardFoot:{ display:"flex", alignItems:"center", justifyContent:"space-between" },
    price:{ fontWeight:700, fontSize:"0.92rem" },
    addBtn:(added)=>({ background:added?c.green:c.ink, color:"#fff", border:"none",
      borderRadius:8, padding:"5px 12px", fontSize:"0.73rem", fontWeight:600, cursor:"pointer" }),
    overlay:(open)=>({ position:"fixed", inset:0, background:"rgba(0,0,0,.4)", zIndex:200,
      opacity:open?1:0, pointerEvents:open?"all":"none", transition:"opacity .25s" }),
    sidebar:(open)=>({ position:"fixed", top:0, right:open?0:-420, width:"min(400px,100vw)",
      height:"100vh", background:c.card, zIndex:300, display:"flex", flexDirection:"column",
      transition:"right .3s cubic-bezier(.4,0,.2,1)", boxShadow:"-8px 0 40px rgba(0,0,0,.12)" }),
    sideHead:{ display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"1.2rem 1.4rem", borderBottom:`1px solid ${c.border}` },
    sideTitle:{ fontWeight:700, fontSize:"1.1rem" },
    closeX:{ background:"none", border:"none", fontSize:"1.3rem", cursor:"pointer", color:c.muted },
    sideItems:{ flex:1, overflowY:"auto", padding:"1rem 1.4rem", display:"flex", flexDirection:"column", gap:8 },
    emptyCart:{ flex:1, display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", color:c.muted, fontSize:"0.85rem", gap:6 },
    cartItem:{ display:"flex", alignItems:"center", gap:8, background:c.paper, borderRadius:10, padding:"0.6rem" },
    ciEmoji:{ fontSize:"1.6rem", width:40, textAlign:"center" },
    ciInfo:{ flex:1 },
    ciName:{ fontSize:"0.82rem", fontWeight:600 },
    ciPrice:{ fontSize:"0.73rem", color:c.muted },
    ciQty:{ display:"flex", alignItems:"center", gap:4 },
    qtyBtn:{ width:24, height:24, borderRadius:6, border:`1px solid ${c.border}`, background:"#fff",
      fontSize:"0.82rem", cursor:"pointer", fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" },
    sideFoot:{ padding:"1.1rem 1.4rem", borderTop:`1px solid ${c.border}` },
    totalRow:{ display:"flex", justifyContent:"space-between", fontWeight:700, marginBottom:"0.9rem" },
    checkBtn:{ width:"100%", padding:"0.8rem", background:c.ink, color:"#fff", border:"none",
      borderRadius:10, fontSize:"0.9rem", fontWeight:700, cursor:"pointer" },
  };
