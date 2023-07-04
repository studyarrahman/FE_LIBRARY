<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-body" style="padding:5px !important;">
                        <form v-on:submit.prevent="kembalikanBuku">
                            <div class="row">
                                <div class="col-sm-5">
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <tbody>
                                                <tr>
                                                    <td colspan="3">Data Transaksi</td>
                                                </tr>
                                                <tr>
                                                    <td>No Peminjaman</td>
                                                    <td>:</td>
                                                    <td>
                                                        <p class="form-control">{{ data.id }}</p>
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>ID Anggota / NIM</td>
                                                    <td>:</td>
                                                    <td>
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" autocomplete="off" id="search-box" v-model="data.nomor_anggota" disabled>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Tgl Peminjaman</td>
                                                    <td>:</td>
                                                    <td>
                                                        <input type="text" class="form-control" autocomplete="off" id="search-box" v-model="data.tanggal_peminjaman" disabled>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Tgl Kembali</td>
                                                    <td>:</td>
                                                    <td>
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" autocomplete="off" id="search-box" v-model="data.tanggal_pengembalian" disabled>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Durasi Keterlambatan</td>
                                                    <td>:</td>
                                                    <td>
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" v-model="data.durasi_keterlambatan">
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Kode Buku</td>
                                                    <td>:</td>
                                                    <td>
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" autocomplete="off" id="search-box" v-model="data.kode_buku" disabled>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>:</td>
                                                    <td>
                                                        <div class="input-group">

                                                            <p type="text" class="">{{data.status_peminjaman}}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="pull-right">
                                <button type="submit" class="btn btn-primary btn-md mx-1"><i class="bi bi-box-arrow-right"></i>Kembalikan</button>
                                <a @click="$router.go(-1)" class="btn btn-danger btn-md">Kembali</a>
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
import { DateTime } from "luxon";
export default {
    name: 'TambahDataPeminjam',
    data() {
        return {
            data: {},
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        kembalikanBuku() {
            const postData = {
                'id_peminjaman_master': this.data.id,
                tanggal_pengembalian: DateTime.now().toFormat('yyyy-MM-dd'),
                durasi_keterlambatan: this.data.durasi_keterlambatan,
            };
            axios.post(`pengembalian_buku.php`, postData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
            })
                .then((response) => {
                    this.$router.push('/peminjaman')
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        async getData() {
            const response = await axios.get(`selectmaster_detail_id.php?id=${this.$route.params.id}`)
            this.data = response.data.data[0];
            console.log(this.data);
        }
    }
}
</script>