<template>
  <div class="hello">
    <p>手榴弹扔了{{$store.state.count}}个</p>
    <p>剩余{{$store.getters.left}}个</p>
    <button @click="add">扔一个</button>
    <button @click="asyncAdd">蓄力扔一个</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    add(){
      this.$store.commit("increment")
    },
    asyncAdd(){
      this.$store.dispatch("asyncIncrement")
    }
  }
}
</script>
