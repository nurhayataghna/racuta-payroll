'use client'
import {useState} from 'react'
import {supabase} from '../lib/supabase'
import {useRouter} from 'next/navigation'
export default function LoginPage(){
 const router=useRouter();const[email,setEmail]=useState('');const[password,setPassword]=useState('');const[msg,setMsg]=useState('')
 async function login(e){
  e.preventDefault();setMsg('')
  const {data,error}=await supabase.auth.signInWithPassword({email,password})
  if(error){setMsg(error.message);return}
  const {data:p}=await supabase.from('profiles').select('role').eq('id',data.user.id).single()
  router.push(p?.role==='admin'?'/admin':'/employee')
 }
 return <div className="login-wrap"><div className="card login-card">
  <div className="brand">Racuta <span>Baby n Kids</span></div>
  <h1 className="title">Payroll Borongan</h1>
  <p className="subtitle">Login karyawan atau admin.</p>
  {msg&&<div className="notice">{msg}</div>}
  <form className="form-stack" onSubmit={login}>
   <div><label>Email</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
   <div><label>Password</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
   <button className="btn btn-primary">Masuk</button>
  </form>
  <p className="small" style={{marginTop:14}}>Karyawan hanya dapat melihat data miliknya sendiri.</p>
 </div></div>
}
