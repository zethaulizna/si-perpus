import React from 'react'
import Layout from '@/widget/layout'
import Judul from '@/components/Judul'
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

    const UbahBuku = () => {
        const [namaBuku, setNamaBuku] = useState ("");
        const [pengarang, setPengarang] = useState ("");
        const [deskripsiBuku, setDeskripsiBuku] = useState ("");
        const [tahunTerbit, setTahunTerbit] = useState ("");

        const router = useRouter();


    useEffect(() => {
        const id = router.query.id
        if (id) {
            const getBukuListById = async () => {
                const BukuDocRef = doc(db, "buku", id);
                try {
                    const docSnap = await getDoc(BukuDocRef);
                    const dataBuku = docSnap.data();
                    setNamaBuku(dataBuku.nama_buku);
                    setPengarang(dataBuku.pengarang);
                    setDeskripsiBuku(dataBuku.deskripsiBuku);
                    setTahunTerbit(dataBuku.tahun_terbit);
                    console.log (dataBuku);
                } catch (err) {
                    console.error(err);
                }
                };
                getBukuListById();
            }
    }, [router]);

    const handleUpdate = async (e) => {
        const { id } = router.query;
        const BukuDocRef = doc(db, "buku", id);
        e.preventDefault();
        try {
            await updateDoc(BukuDocRef, {
                nama_buku: namaBuku,
                pengarang: pengarang,
                deskripsi_buku: deskripsiBuku,
                tahun_terbit: tahunTerbit,
            });
            router.push("/");
        }   catch (e) {
            console.error(e);
        }
    };
    
    return (
    <Layout>
    <div className="flex justify-center mx-2 mt-10">
        <div className="w-[550px] rounded-lg shadow-gray-200 shadow-lg p-10">
        {/*Judul*/}
        <div className="mb-3">
            <h3 className="text-2xl font-bold">Form Ubah Buku</h3>
        </div>
        {/* form ubah */}
        <div>
        <form onSubmit={handleUpdate}> 
            <div className="mb-3">
                <label 
                className="text-md">Nama Buku</label>
                <input type="Text" className="mt-2 block w-11/12 rounded-xl border px-3 py-2" 
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
);
};

export default UbahBuku;