import React from 'react'
import Layout from '@/widget/layout'
import { collection, addDoc } from "firebase/firestore";
import { useState } from 'react';
import { useRouter } from "next/router";
import Judul from "@/components/Judul";
import { db } from "@/config/firebase";

const TambahBuku = () => {
    const [namaBuku, setNamaBuku] = useState("");
    const [pengarang, setPengarang] = useState("");
    const [deskripsiBuku, setDeskripsiBuku] = useState("");
    const [tahunTerbit, setTahunTerbit] = useState("");

    const router = useRouter();

    const bukuCollectionRef = collection(db, "buku");
  
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        await addDoc(bukuCollectionRef, {
          nama_buku: namaBuku,
          pengarang: pengarang,
          deskripsi_buku: deskripsiBuku,
          tahun_terbit: tahunTerbit,
        });
        router.push("/");
      } catch (err) {
        console.log(err);
      }
    };

  return <Layout>
    <div className="flex justify-center mx-2 mt-10">
        <div className="w-[550px] rounded-lg shadow-gray-200 shadow-lg p-10">
        {/*Judul*/}
        <div className="mb-3">
            <h3 className="text-2xl font-bold">Form Tambah Buku</h3>
        </div>
        {/* form tambah */}
        <div>
        <form onSubmit={submitHandler}>
            <div className="mb-3">
                <label className="text-md">Nama Buku</label>
                <input type="Text" name="nama_buku" className="mt-2 block w-11/12 rounded-xl border px-3 py-2" 
                onChange={(event) => {
                    setNamaBuku(event.target.value);

                }}
                value={namaBuku}
                required
                />
            </div>
            <div className="mb-3">
                <label className="text-md">Pengarang</label>
                <input type="Text" className="mt-2 block w-11/12 rounded-xl border px-3 py-2" 
                onChange={(event) => {
                    setPengarang(event.target.value);

                }}
                value={pengarang}
                required
                />
            </div>
            <div className="mb-3">
                <label className="text-md">Deskripsi Buku</label>
                <input type="Text" className="mt-2 block w-11/12 rounded-xl border px-3 py-2" 
                onChange={(event) => {
                    setDeskripsiBuku(event.target.value);

                }}
                value={deskripsiBuku}
                required
                />
            </div>
            <div className="mb-3">
                <label className="text-md">Tahun Terbit</label>
                <input type="Text" className="mt-2 block w-11/12 rounded-xl border px-3 py-2" 
                onChange={(event) => {
                    setTahunTerbit(event.target.value);

                }}
                value={tahunTerbit}
                required
                />
            </div>
            <button className="bg-sky-500 hover:bg-sky-700 px-16 py-2 ml-20 text-white rounded-full mt-3">Simpan</button>
        </form>
        </div>
        </div>
    </div>
  </Layout>
};

export default TambahBuku;