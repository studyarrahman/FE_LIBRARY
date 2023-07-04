<script>
import axios  from "axios";
import TableComponent from "../../components/Table.vue";
// fetch data
export default {
  name: "DataPengembalian",
  components: {
    TableComponent,
  },
  data() {
    return {
      dataRow: [],
      fields: [
      {
          key: "id",
          label: "No Pinjam",

        },
        {
          key: "nomor_anggota",
          label: "ID Anggota",

        },
        {
          key: "status_peminjaman",
          label: "status",

        }, {
          key: "tanggal_pengembalian",
          label: "kembali",

        },

        {
          key: "durasi_keterlambatan",
          label: "Durasi Keterlambatan",

        }
      ],
      actionButtons: []
      
    };
  },
  async mounted() {
    const { data } = await axios.get("listpeminjaman_dikembalikan.php");
    
    this.dataRow = data.data; // mengambil key data karena di response terdapat key data yang berisi array
  }
  
};
</script>

<template>
    <nav id="navbar-example2" class="navbar navbar-dark bg-dark px-3 mb-3 fixed-top">
  <a class="navbar-brand" href="#">CRUD OPERATION</a>
  <ul class="nav nav-pills">
    <li class="nav-item">
      <a class="nav-link btn btn-outline-warning text-white" href="/">Home</a>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle btn btn-outline-warning text-white" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Transaksi</a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="/library-web/peminjaman">Peminjaman</a></li>
        <li><a class="dropdown-item" href="/library-web/pengembalian">Pengembalian</a></li>
      </ul>
    </li>
    <li class="nav-item">
      <a class="nav-link btn btn-outline-warning text-white" href="/library-web/profile">Go to Profile</a>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle btn btn-outline-warning text-white" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Select Operation</a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#operasibuku">Buku</a></li>
        <li><a class="dropdown-item" href="#operasikategori">Kategori</a></li>
      </ul>
    </li>
    
  </ul>
</nav>
  <main class="full">
    <div class="container">
      <hr>
      <hr>
      <hr>
      <TableComponent :fields='fields' :dataRow ="dataRow" :actionButtons="actionButtons" />
    </div>
  </main>
</template>
