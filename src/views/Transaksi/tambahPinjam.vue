<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-body" style="padding:5px !important;">
                        <form v-on:submit.prevent="submitForm">
                            <div class="row">
                                <div class="col">
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <tbody>
                                                <tr>
                                                    <td colspan="3">Data Transaksi</td>
                                                </tr>
                                                <tr>
                                                    <td>Tgl Peminjaman</td>
                                                    <td>:</td>
                                                    <td>
                                                        <input type="date" name="tgl" class="form-control"
                                                            v-model="form.tanggal_peminjaman">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>ID Anggota / NIM</td>
                                                    <td>:</td>
                                                    <td>
                                                        <div class="input-group">
                                                            <!-- <input type="text" class="form-control"
                                                                autocomplete="off" id="search-box"
                                                                placeholder="Contoh ID Anggota atau NIM" v-model="form.nomor_anggota"> -->
                                                                <select class="form-control" v-model="form.nomor_anggota" >
                                                                    <option selected disabled>Anggota</option>
                                                                    <option v-for="anggota in form.semua_anggota" :value="anggota.id">{{anggota.nama}}</option>
                                                                </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Kode Buku</td>
                                                    <td>:</td>
                                                    <td>
                                                        <div class="input-group">
                                                            <!-- <input type="text" class="form-control" autocomplete="off"
                                                                name="buku_id" id="buku-search"
                                                                placeholder="Contoh ID Buku : BK001" 
                                                                v-model="form.kode_buku[0]"> -->
                                                                <select class="form-control" v-model="form.kode_buku[0]" >
                                                                    <option selected disabled>pilih kode buku</option>
                                                                    <option v-for="buku in form.semua_buku" :value="buku.kode">{{buku.judul}}</option>
                                                                </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="pull-right">
                                <input type="hidden" name="tambah" value="tambah">
                                <button type="submit" class="btn btn-primary btn-md">Submit</button>
                                <RouterLink to="/" class="btn btn-danger btn-md">Kembali</RouterLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    </section>
</template>
<script>
import axios from 'axios'
import {DateTime} from 'luxon'
export default {
    name: 'TambahDataPeminjam',
    data() {
        return {
            form: {
                nomor_anggota: '',
                tanggal_peminjaman: DateTime.now().toISODate(),
                kode_buku: [],
                semua_buku: null,
                semua_anggota: null,
            },
        }
    },
    methods: {
        submitForm() {
            // set tanggal kembali to tanggal pinjam + lama pinjam
            axios.post('peminjaman_buku.php', this.form, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
            })
                .then((response) => {
                    this.$router.push('/dashboard')
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        selectBuku(){
            axios.get(`selectallbuku.php`)
                .then((response) => {
                    this.form.semua_buku = response.data
                    console.log(this.form.semua_buku);
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        selectAnggota(){
            axios.get(`selectallanggota.php`)
                .then((response) => {
                    this.form.semua_anggota = response.data
                    console.log(this.form.semua_anggota);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    mounted(){
        this.selectBuku()
        this.selectAnggota()
    },
}
</script>