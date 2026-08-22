'use client'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
export default function Topbar({name,role}){
 const router=useRouter()
 async function logout(){await supabase.auth.signOut();router.push('/')}
 return <div className="topbar"><div className="topbar-inner">
   <div><div className="brand">Racuta <span>Payroll</span></div><div className="small">{name} · {role}</div></div>
   <button className="btn btn-secondary" onClick={logout}>Keluar</button>
 </div></div>
}
