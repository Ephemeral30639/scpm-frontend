<template>

<!-- Top Navigation Bar -->
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">Home</el-menu-item>
  <el-submenu index="2">
    <template #title>Features</template>
    <el-menu-item index="2-1">Course and Credit Tracking</el-menu-item>
    <el-menu-item index="2-2">Course Suggestions</el-menu-item>
    <el-menu-item index="2-3">Generation Per Course Counter</el-menu-item>
    <el-menu-item index="2-4">Makeup Finder</el-menu-item>
  </el-submenu>
  <el-menu-item index="3">Login</el-menu-item>
  <el-menu-item index="4">Register</el-menu-item>
</el-menu>

<!-- Welcoming Text -->
<h1>Simplify Your College Planning Experience</h1>
<h3>The all in one tool to keep track of your studies</h3>

<!-- Feature Card Container -->
<el-row :gutter="20">

  <!-- Feature Card 1 -->
  <el-col :span="6">
    <div class="grid-content bg-purple"></div>
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://i.ibb.co/zZ37RMz/course-credit-tracking-icon.jpg" class="image">
      <div style="padding: 14px;">
        <h2>Course and Credit Tracking</h2>
        <span>Keep track of the courses you have taken and the credits you have obtained so far</span>
        <div class="center" style="padding-top: 15px;">
          <el-button type="primary">Use</el-button>
        </div>
      </div>
    </el-card>
  </el-col>

  <!-- Feature Card 2 -->
  <el-col :span="6">
    <div class="grid-content bg-purple"></div>
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://i.ibb.co/MM6M6m0/suggestion-icon.jpg" class="image">
      <div style="padding: 14px;">
        <h2>Course Suggestions</h2>
        <span>Suggest the next course you should take based on your taken courses</span>
        <div class="center" style="padding-top: 15px;">
          <el-button type="primary">Use</el-button>
        </div>
      </div>
    </el-card>
  </el-col>

  <!-- Feature Card 3 -->
  <el-col :span="6">
    <div class="grid-content bg-purple"></div>
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://i.ibb.co/8dy4tXQ/Manual-red-tally-counter-with-four-digit-numeric-and-pressing-button-on-the-yellow-background.jpg" class="image">
      <div style="padding: 14px;">
        <h2>GPCC</h2>
        <span>Generation Per Course Counter. Check how many students in a generation has taken a specific course</span>
        <div class="center" style="padding-top: 15px;">
          <el-button type="primary">Use</el-button>
        </div>
      </div>
    </el-card>
  </el-col>

  <!-- Feature Card 4 -->
  <el-col :span="6">
    <div class="grid-content bg-purple"></div>
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://i.ibb.co/nDPfcYg/makeup-icon.png" class="image">
      <div style="padding: 14px;">
        <h2>Makeup Finder</h2>
        <span>Find available timeslots for your cancelled classes in an efficient manner</span>
        <div class="center" style="padding-top: 15px;">
          <el-button type="primary">Use</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
  
</el-row>

</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    padding: 0;
    min-height: auto;
  }

  .image {
    width: 100%;
    display: block;
  }
</style>
