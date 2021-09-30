<template>
<!-- Welcoming Text -->
<h1>Simplify Your College Planning Experience</h1>
<h3>The all in one tool to keep track of your studies</h3>

<!-- Feature Card Container -->
<el-row :gutter="20">

  <!-- Feature Card 1 -->
  <el-col :span="6">
    <div class="grid-content bg-purple"></div>
    <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/course-credit-tracking-icon.jpg" class="image">
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
      <img src="../assets/advice-comment-icon.jpg" class="image">
      <div style="padding: 14px;">
        <h2>Course Advices and Comments</h2>
        <span>Worry about the next course you should take? Check out advices from seniors or comments from fellow students on how the course will be like</span>
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
      <img src="../assets/counter-icon.jpg" class="image">
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
      <img src="../assets/makeup-icon.png" class="image">
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
