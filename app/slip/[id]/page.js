'use client'
import {useEffect,useState} from 'react'
import {useParams} from 'next/navigation'
import {supabase} from '../../../lib/supabase'
const rp=n=>'Rp'+Number(n||0).toLocaleString('id-ID')
export default function SlipPage(){
 const {id}=useParams();const[slip,setSlip]=useState(null);const[items,setItems]=useState([])
 useEffect(()=>{load()},[id])
 async function load(){const {data:s}=await supabase.from('payroll_slips').select('*,profiles!payroll_slips_employee_id_fkey(full_name,email),payroll_periods(name,start_date,end_date)').eq('id',id).single();setSlip(s);const {data:i}=await supabase.from('payroll_items').select('*').eq('slip_id',id).order('product_name');setItems(i||[])}
 if(!slip)return <div className="container">Memuat slip...</div>
 return <div className="container"><div className="card print-card"><div className="header-row"><div><div className="brand">Racuta <span>Baby n Kids</span></div><h1 style={{marginBottom:4}}>Slip Upah Borongan</h1><div className="small">{slip.payroll_periods?.name} · {slip.payroll_periods?.start_date} s/d {slip.payroll_periods?.end_date}</div></div><button className="btn btn-primary no-print" onClick={()=>window.print()}>Cetak / Simpan PDF</button></div>
 <div className="grid grid-2" style={{margin:'20px 0'}}><div><b>Nama Penjahit</b><br/>{slip.profiles?.full_name}<br/><span className="small">{slip.profiles?.email}</span></div><div><b>Status Pembayaran</b><br/>{slip.payment_status.toUpperCase()}{slip.paid_at&&<div className="small">Dibayar: {new Date(slip.paid_at).toLocaleString('id-ID')}</div>}</div></div>
 <div className="table-wrap"><table><thead><tr><th>Produk/Proses</th><th>Qty Lolos QC</th><th>Tarif</th><th>Jumlah</th></tr></thead><tbody>{items.map(i=><tr key={i.id}><td>{i.product_name}</td><td>{i.approved_qty}</td><td>{rp(i.rate_per_piece)}</td><td>{rp(i.amount)}</td></tr>)}</tbody></table></div>
 <div style={{marginTop:20,marginLeft:'auto',maxWidth:380}}><div className="slip-row"><span>Upah bruto</span><b>{rp(slip.gross_pay)}</b></div><div className="slip-row"><span>Bonus</span><b>{rp(slip.bonus)}</b></div><div className="slip-row"><span>Potongan</span><b>{rp(slip.deduction)}</b></div><div className="slip-total"><span>Total diterima</span><b>{rp(slip.net_pay)}</b></div></div>
 <p className="small" style={{marginTop:28}}>Slip ini dibuat oleh Racuta Payroll System berdasarkan hasil produksi yang telah lolos verifikasi QC.</p></div></div>
}
