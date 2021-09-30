<template>
  <div class="container" style="width: 70%; justify-content: space-between;">
    <div>
        <h1 style="text-align:left; padding-top: 30px;">Disclaimer</h1>
        <el-divider></el-divider>
        <p style="text-align:left; font-size: 25px">This web is NOT connected to SKY of Mahidol University International College. All data in this web is completely separated from SKY.</p>
        <em style="text-align:left;">As such, in order for this website to work properly, we ask that the users be reponsible with inputting and updating their data.</em>
    </div>
    <br><br>
    <div>
        <h1 style="text-align:left; padding-top: 30px;">General Use Case</h1>
        <el-divider></el-divider>
        <p style="text-align:left; font-size: 25px">Whenever you PASSED a course, update your taken courses in the "Course and Credit Tracking" page. This will help you keep track of your studies.</p>
        <p style="text-align:left; font-size: 25px">Whenever you finished registering in SKY, go to "Enroll" page and enroll in the same courses that you have registered in SKY. Doing so will update the database of our Makeup Finder.</p>
    </div>
    <br><br>
    <div>
        <h1 style="text-align:left; padding-top: 30px;">Taken Courses Feature</h1>
        <el-divider></el-divider>
        <p style="text-align:left; font-size: 25px">There are three buttons at the top of the page. With those buttons, you can add a course, delete a course, or check if you have taken a course. The categories are organized in the same way as the catalog.</p>
    </div>
    <br><br>
    <div>
        <h1 style="text-align:left; padding-top: 30px;">Advice Feature</h1>
        <el-divider></el-divider>
        <p style="text-align:left; font-size: 25px">Some course require more preparation than others. All the advices you see in that page are advices from seniors who have already taken the course. Each advise are compiled from a survey where we have to pre-process the responses first before publishing it to the web.</p>
    </div>
    <br><br>
    <div>
        <h1 style="text-align:left; padding-top: 30px;">Comment Feature</h1>
        <el-divider></el-divider>
        <p style="text-align:left; font-size: 25px">Comments from any users that have registered with our web. Get the general feeling of how class will be like.</p>
        <em style="text-align:left;">We ask that the users be civil and submit comments that are appropriate and helpful. Additionally, one should comment only if they have already taken the course.</em>
    </div>
    <br><br>
    <div>
        <h1 style="text-align:left; padding-top: 30px;">Generation Per Course Counter (GPCC)</h1>
        <el-divider></el-divider>
        <p style="text-align:left; font-size: 25px">This is a "Historical Counter". Meaning that it is accumulative. The data you see in each course's counter are NOT the number of people who are enrolled in that course in a given trimester. They are counters for the amount of people who have already "passed" the course (counted from the start of this web deployment).</p>
        <em style="text-align:left;">Since our web is not connected to MUIC SKY, the data may not be accurate IF the users are not updating their data frequently.</em>
    </div>
    <br><br>
    <div>
        <h1 style="text-align:left; padding-top: 30px;">Makeup Finder</h1>
        <el-divider></el-divider>
        <p style="text-align:left; font-size: 25px">Find out the available makeup slot within seconds.</p>
        <em style="text-align:left;">Since our web is not connected to MUIC SKY, if the users do not come to our web and enroll in the course they have registered for in SKY, our web app will not display the makeup time slot correctly. As such, the data you see might not be 100% accurate. Our web replies heavily on the users being reponsible.</em>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const activeNames = ref(['1'])
    const handleChange = (val) => {
      console.log(val)
    }
    return {
      activeNames,
      handleChange,
    }
  },
})
</script>
