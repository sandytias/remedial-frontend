import React from 'react'
import Axios from 'axios'

class Home extends React.Component {
    state = {
        data: [],
        selectedId: null
    }
    componentDidMount() {
        Axios.get('http://localhost:2000/work_list')
            .then((res) => {
                this.setState({ data: res.data })
                console.log(this.state.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    editData = (id) => {
        console.log(id)
        this.setState({ selectedId: id })
        console.log(this.state.selectedId)
    }

    renderData = () => {
        return this.state.data.map((val, index) => {
            if (this.state.selectedId === val.id) {
                return (
                    <tr key={val.id}>
                        <td ><input type="text" className="form-control" ref='namaEdit' defaultValue={val.nama} /></td>
                        <td ><input type="text" className="form-control" ref='usiaEdit' defaultValue={val.usia} /></td>
                        <td ><input type="text" className="form-control" ref='pekerjaanEdit' defaultValue={val.pekerjaan} /></td>
                        <td >
                            <input type='button' onClick={() => this.yesEdit(val.id)} className='form-control btn-info' value='Yes' />
                            <input type='button' onClick={this.noEdit} className='form-control btn-warning' value='No' />
                        </td>
                    </tr>
                )
            }
            else {
                return (
                    <tr key={val.id}>
                        <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.nama}</td>
                        <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.usia}</td>
                        <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.pekerjaan}</td>
                        <td id={val.id} style={{ verticalAlign: 'middle' }}>
                            <input type='button' onClick={() => this.editData(val.id)} className='form-control btn-info' value='Edit' />
                            &nbsp;
                        <input type='button' onClick={() => this.deleteData(val.id)} className='form-control btn-warning' value='Delete' />
                        </td>
                    </tr>
                )
            }
        })
    }

    yesEdit = (id) => {
        var namaEdit = this.refs.namaEdit.value
        var usiaEdit = this.refs.usiaEdit.value
        var pekerjaanEdit = this.refs.pekerjaanEdit.value
        if (namaEdit === '' || usiaEdit === '' || pekerjaanEdit === '') {
            alert('Pembaruan Berhasil')
        }
        else {
            Axios.put(`http://localhost:2000/work_list/${id}`, {
                nama: namaEdit,
                usia: usiaEdit,
                pekerjaan: pekerjaanEdit
            })
                .then((res) => {
                    console.log(res.data)
                    Axios.get(`http://localhost:2000/work_list`)//update data
                        .then((res) => {
                            this.setState({ data: res.data, selectedId: null })
                        })
                })
        }
    }

    noEdit = () => {
        this.setState({ selectedId: null })
        Axios.get('http://localhost:2000/work_list')
    }

    deleteData = (id) => {
        Axios.delete(`http://localhost:2000/work_list/${id}`)
            .then((res) => {
                const dataSelect = res.data;
                this.setState({ dataSelect });
                console.log(dataSelect)
                Axios.get('http://localhost:2000/work_list')
                    .then((res) => {
                        this.setState({ data: res.data })
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    submitData = () => {
        var namaNew = this.refs.namaNew.value
        var usiaNew = this.refs.usiaNew.value
        var pekerjaanNew = this.refs.pekerjaanNew.value
        Axios.post('http://localhost:2000/work_list', {
            nama: namaNew,
            usia: usiaNew,
            pekerjaan: pekerjaanNew
        })
            .then((res) => {
                console.log(res.data)
                Axios.get('http://localhost:2000/work_list')
                    .then((res) => {
                        this.setState({ data: res.data })
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    clearData = () => {
        this.state.data.forEach(val => {
            Axios.delete(`http://localhost:2000/work_list/${val.id}`)
                .then((res) => {
                    console.log(res)
                    Axios.get(`http://localhost:2000/work_list`)
                        .then((res) => {
                            this.setState({ data: res.data })
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }

    render() {
        return (
            <div>
                <h1>SOAL 1</h1>
                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        <select className='form-control'>
                            <option>Filter By Pekerjaan</option>
                        </select>
                    </div>
                </div>
                <table className='table mb-4'>
                    <thead>
                        <tr>
                            <td>Nama</td>
                            <td>Usia</td>
                            <td>Pekerjaan</td>
                            <td>Act</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderData()}
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Nama' ref='namaNew' /> </div>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Usia' ref='usiaNew' /> </div>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Pekerjaan' ref='pekerjaanNew' /> </div>
                    <div className='col-md-3'> <input type='button' className='form-control btn-info' onClick={this.submitData} value='add Data' />
                        <input type='button' className='form-control btn-danger' onClick={this.clearData} value='Clear Data' />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home