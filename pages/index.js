import Layout from "@/widget/layout"
import IkonUbah from "@/assets/ikonUbah"
import IkonHapus from "@/assets/ikonHapus"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { db } from "@/config/firebase" 
// import axios from "axios";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";

// import { collection, getDocs } from "firebase/firestore"

export default function Home () {

  const [buku, setBuku] = useState ([]);
  const [search, setSearch] = useState ([]);
  const bukuCollectionRef = collection(db, "buku");

  const getBukuList = async () => {
    try {
      const data = await getDocs(bukuCollectionRef);
      const filteredData = data.docs.map ((doc) => ({
        ... doc.data(),
        id: doc.id,
      }));
      console.log(data);
      setBuku(filteredData);
      console.log(buku);
    } catch (err) {
      console.error(err);
    }
  };

  const router = useRouter();

  const addBookHandler = () => {
    router.push ("/tambah-buku");
  };

  const updateBookHandler = (id) => {
    router.push (`/ubah-buku/${id}`);
  };

  useEffect (()=>{getBukuList()}
  ,[])

  const deleteBuku = async (id) => {
    const bukuDoc = doc(db, "buku", id);
    await deleteDoc(bukuDoc);
    getBukuList();
  };

  return <Layout>
    <div className="flex justify-center mx-3">
      <div>
        {/* judul */}
        <div className="mt-10 mb-5">
          <h3 className="text-2xl font-semibold">Data Buku Perpustakaan</h3>
        </div>
        <button onClick={addBookHandler} className="bg-sky-500 text-white px-6 py-2 rounded-full hover:bg-sky-700">
          Tambah Buku Perpustakaan
        </button>

        {/* search */}
        <div className="flex items-center justify-end">
          <input
          type="text"
          className="w-42 mt-2 block rounded-xl border px-3 py-2"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ketik keyword"
          >
          </input>
        </div>
        
        {/* tabel */}
        <div className="mt-6">
          <table className="bg-sky-50 py-10 rounded-xl table-auto">
            <thead className="mx-3 border-b-4">
              <tr>
                <th className="px-6 py-3">Nama Buku</th>
                <th className="px-6 py-3">Pengarang</th>
                <th className="px-6 py-3">Deskripsi Buku</th>
                <th className="px-6 py-3">Tahun Terbit</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {buku.length > 1 ? (
              buku
                .filter((data) => (
                data.nama_buku ?.toLowerCase().includes(search)
                ))
                .map((data) => (
                  <tr className="hover:bg-sky-200" key={data.id}>
                    <td scope="col" className="px-6 py-3">
                      {data.nama_buku}
                    </td>
                    <td scope="col" className="px-6 py-3">{data.nama_buku}</td>
                    <td scope="col" className="px-6 py-3">{data.pengarang}</td>
                    <td scope="col" className="px-6 py-3">{data.deskripsi_buku}</td>
                    <td scope="col" className="px-6 py-3">{data.tahun_terbit}</td>
                    <td scope="col" className="flex px-6 py-3">
                      <span
                        className="hover: mr-2 h-8 w-8 cursor-pointer hover:text-sky-500"
                        onClick={() => {
                          updateBookHandler(data.id);
                        }}
                      >
                        <IkonUbah />
                      </span>
                      <span
                        className="cursor-pointer h-8 w-8 mr-2 hover:text-red-500"
                        onClick={() => {
                          deleteBuku(data.id);
                        }}
                      >
                        <IkonHapus />
                      </span>
                    </td>
                  </tr>
                ))
                ) : (
                  <tr>
                    <td className="py-5 text-center" colSpan={6}>
                      Belum ada data buku!
                    </td>
                  </tr>
                )}   
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout>
  
}