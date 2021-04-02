<template>
  <div id="app">
    <h2>Actividad Lección 6 Módulo 5 - Firebase</h2>
    <ul class="errores">
      <li v-show="!validacion.nombre">El campo no puede estar vacío.</li>
      <li v-show="!validacion.email">Por favor ingrese un email válido.</li>
    </ul>
    <form id="formulario" @submit.prevent="agregarUsuario()">
    <input v-model="nuevoUsuario.nombre" placeholder="Ingrese nombre" class="input-nombre" type="text">
    <input v-model="nuevoUsuario.email" placeholder="Ingrese correo electrónico" class="input-email" type="text">
    <input type="submit" value="Agregar Usuario" class="btn">
    </form>
    <ul class="lista">
      <li v-for="(usuario, index) in usuarios" :key="index" class="usuario-agregado">
      <span>{{ usuario.nombre }} - {{ usuario.email }}</span>
        <button @click="removerUsuario(usuario)" class="borrar">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from '@/db.js'
export default {
  name: 'App',
  data() {
    return {
      usuarios: [],
      nuevoUsuario: {
      nombre: null,
      email: null,
      },
      validacion: {
        nombre: true,
        email: true,
      },
  }},
  computed: {
    verificarNombre() {
      return this.nuevoUsuario.nombre.length > 0;
    },
    verificarEmail() {
      const emailRegExp = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
      return emailRegExp.test(this.nuevoUsuario.email);
    },
  },
  methods: {
      agregarUsuario() {
      this.validacion.nombre = this.verificarNombre;
      this.validacion.email = this.verificarEmail;
      
      if (this.validacion.email && this.validacion.nombre) {

        db.collection("usuarios").add({
          nombre: this.nuevoUsuario.nombre,
          email: this.nuevoUsuario.email
        })
        this.nuevoUsuario = { nombre: null, email: null };
    }},
    removerUsuario(usuario) {
      db.collection("usuarios").doc(usuario.id).delete()
    }
  },
  firestore: {
    usuarios: db.collection("usuarios"),
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input{
  margin: 1vw;
  height: 4vh;
}
.btn {
  height: 5vh;
  background-color: pink;
  border: solid palevioletred 1px;
  box-shadow: rgb(199, 197, 197) 1px 1px 1px;
}
.errores {
  color: red;
  font-size: small;
  list-style: none;
}
.lista{
  font-size: medium;
  list-style:none ;
}
.lista li{
  margin-bottom: 2vh;
}
.borrar{
  margin-left: 1rem;
  background-color: pink;
  border: solid palevioletred 1px;
  box-shadow: rgb(199, 197, 197) 1px 1px 1px;
}

</style>
