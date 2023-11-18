<template>
    <v-app id="inspire" >
        <v-navigation-drawer v-model="drawer" app
      color="#3498db"
      >
        <v-card
          class="pa-4"
          variant="tonal"
          color="#ecf0f1"
        >
          <v-avatar
            class="mb-4"
            color="grey-darken-1"
            size="64"
          >
        </v-avatar>  
        <div text-color="#2c3e50">Username here</div>
        </v-card>
  
        <v-divider></v-divider>
  
        <v-list>
        
          <v-list-item
          :color="ListColor"
          prepend-icon="mdi-send"
          title="Log Out"
          color="black"
          link
          @click="LogOut()"
          >
          </v-list-item> 

          <v-list-item
            prepend-icon="mdi-send"
            color="#3498db"
            title="Make an Agenda"  
            link>

            <v-dialog
            v-model="dialognewagenda"
            activator="parent"
            persistent
            width="1024">
  
            <v-card color="#ecf0f1">
              <v-card-title color="#2c3e50">
                <span class="text-h5" color="#2c3e50">Make an Agenda! </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
  
                    <v-col cols="12" sm="6" md="12" >
                      <v-text-field md="6"
                        align-self="center"
                        label="Name of your new Agenda*"
                        hint="example: Please vote for Joe Biden!"
                        required
                        clearable
                        v-model="NameOf_NewAgenda"
                      ></v-text-field>
                    </v-col>
  
  
                    <!-- <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Number of Votes in your new Agenda*"
                        v-model="VoteNumOf_NewAg"
                        required
                        clearable
                      ></v-text-field>
                    </v-col> -->
                    
                  </v-row>
                </v-container>
                <small>*indicates required info</small>
              </v-card-text>
              
                <v-btn
                  color="#e74c3c"
                  variant="text"
                  :ripple="{ class: 'text-red' }"
                  @click="dialognewagenda = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="#3498db"
                  :ripple="{ class: 'text-green' }"
                  @click="submitAgenda(NameOf_NewAgenda);showvote()"
                >
                  Submit
                </v-btn>  
                
            </v-card>
             
          </v-dialog>

            </v-list-item>
                 
        <v-list-item
        prepend-icon="mdi-alert-octagon"
        title="Help"
        link
        >
        </v-list-item>

        </v-list>
      </v-navigation-drawer>
      <!-- v-main是中间的主体部分 -->
      <v-main :style="{ backgroundColor: containerColor}" 
      class="transparent-container " >
        <v-container
          class="py-8 px-6 #ecf0f1 transparent-container "
          :style="{ backgroundColor: containerColor }"
          fluid
          v-model="AContainer"
        >
          <v-row class="transparent-container">
            <v-col
              v-for="AVote in AVotes"
              :key="AVote.Agda_Name"
              :id="AVote.Agda_Name"
              cols="12"
              color="#ecf0f1" class="transparent-container"
            >
            <!-- card是agenda -->
            
              <v-card prepend-icon="mdi-calendar" :title="AVote.Agda_Name" class="transparent-container">
                <!-- toolbar是agenda的表头，包含删除功能 -->
                <v-toolbar  density="compact" color="#ecf0f1" class="transparent-container">
                  <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
                      <!-- 添加投票Vote -->
                      <v-spacer></v-spacer>
                      <v-dialog
                      v-model="dialognewvote"
                      width="1024"
                      >
                      <template v-slot:activator="{ props }">
                        <v-btn
                          color="primary"
                          v-bind="props"
                        >
                          Add Vote
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Add Vote for current Agenda! </span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row >

                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-text-field
                                v-model="targetAgenda"
                                label="Your target agenda:"
                                hint="" />
                              </v-col>

                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-text-field
                                  label="Name for your new Vote: "
                                  hint="example: Please vote for Donald Biden!"
                                  required
                                  v-model="NameOf_NewVote" />
                              </v-col>

                                <v-col cols="12" sm="6" md="8">
                                  <v-select
                                  :items="['1', '2', '3', '4']"
                                    label="Number of Choices in your new Vote*"
                                    required
                                    size="large"
                                    align-self="center"
                                    v-model="CreateVote_SelectedItem"
                                  ></v-select>  
                                </v-col>  
                                <v-col cols="auto" sm="6" md="4">
                                  <v-btn prepend-icon="mdi-check-circle" size="large" align-self="center" color="#3498db"
                                  @click=" GiveVoteNum(AVote.Agda_Name)">
                                    Customize choices! 
                                  </v-btn>
                                </v-col>
                            </v-row>
                          </v-container>
                          <small>*indicates required field</small>
                        </v-card-text>
                      </v-card>

                      <v-dialog
                      v-model="dialogCreateVote"
                      width="720">
                      <v-list lines="two">

                        <template v-for="i in VoteCount" :key="i">
                          <v-list-item>

                            <v-card :title="'Choice: '+i">

                              <v-text-field
                              label="Insert customized text here! "
                              v-model="UserInput[i]"
                              prefix="/"></v-text-field>

                            </v-card>        

                            <!-- <v-list-item-title :title="`Message ${n}`"></v-list-item-title>  -->
        
                            <!-- <v-list-item-subtitle title="imilique"></v-list-item-subtitle> -->
                          </v-list-item>
        
                          <v-divider
                            v-if="i !== VoteCount"
                            :key="`divider-${n}`"
                          ></v-divider>
                        </template>

                        <v-list-item>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="#e74c3c"
                              variant="text"
                              @click="dialogCreateVote = false"
                              :ripple="{ class: 'text-red' }"
                            >
                              Discard
                            </v-btn>
                            <v-btn
                              color="#3498db"
                              variant="text"
                              @click="CreateVote(UserInput, NameOf_NewVote, targetAgenda, vc);showvote()"
                              :ripple="{ class: 'text-green' }"
                            >
                              SUBMIT
                            </v-btn>
                          </v-card-actions>
                        </v-list-item>

                      </v-list>
                    
                    </v-dialog>

                    </v-dialog>

                    <v-btn
                    color="primary" :disabled="buttonDisabled" @click="extractSelection(AVote, selectedItems)">
                    Submit Vote info
                    </v-btn>

                  <v-menu :location="end">
                    <template v-slot:activator="{ props }">
          
                      <v-btn 
                      icon="mdi-dots-vertical"
                      v-bind="props"
                      ></v-btn>
          
                    </template>
                      <!-- 删除议程Agenda -->
                        <v-btn
                    prepend-icon="mdi-delete"
                    color="#e74c3c"
                    :ripple="{ class: 'text-red' }"                   
                    @click="removeCard(AVote.Agda_Name);showvote()">
                      Delete
                    </v-btn>
          
                  </v-menu>
                  
                </v-toolbar>
                
                <!-- 下面是每个agenda的具体投票项目 -->
                <v-list lines="one">
                  <!-- <v-list-subheader :title="card"></v-list-subheader> -->

                  <!-- 下面的list-item里是agenda的具体投票项目中的具体选项 -->
                  <template v-for="(v,index) in AVote.Vts_Of_Agda " :key="v.Vt_Name">
                    <v-list-item >
                      <v-list-item-title variant="tonal">{{ v.Vt_Name }}</v-list-item-title>
                      <template v-slot:prepend>
                        <v-avatar icon="mdi-vote"></v-avatar>
                      </template>

                      <div>
                        <v-select label="Select" multiple :items="v.Choices.slice(0, (v.Choices.length)/2)"
                        variant="underlined"
                        hint="pick your choice for this vote" persistent-hint chips
                        v-model="selectedItems[index]">
                        </v-select>
                      </div>
                        <template v-for="(c_status, choicemark) in v.Choices.slice((v.Choices.length)/2, v.Choices.length)">
                          <v-chip v-if="choicemark === 0" class="ma-2" label color="#3498db" >
                            <v-icon start icon="mdi-label"></v-icon>  
                            Current Vote Status: </v-chip>
                          <v-chip v-if="choicemark < v.Choices.length/2"
                        class="ma-2" color="success" variant="outlined">
                        {{ 'Choice: ' + v.Choices[0] + ' Chosen: ' + c_status }}
                        </v-chip>
                        </template>

                    </v-list-item>
  
                  </template>
                </v-list>
                <!-- 提交按钮Submit -->

              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <!-- navigation-drawer是左侧导航栏 -->

      
    </v-app>
  </template>
  

  <script setup>
    import { ref } from 'vue'
    import addVote from '@/components/AddVote.vue'
    import cloneDeep from 'lodash/cloneDeep';

    const drawer = ref(null)

  </script>
  
  <style scoped>
  .app-with-background {
    background-image: url('/imgs/mainbg.jpg');
    background-size: cover; /* 可以根据需要选择其他值，比如 'contain' */
    background-position: center center;
  }
  .transparent-container {
    background: rgba(255, 255, 255, 0.3); /* 调整最后一个值 (0.5) 以改变透明度，范围是 0（完全透明）到 1（完全不透明） */
  }

  ::v-deep .v-navigation-drawer {
    background-color: rgba(52, 152, 219, 0.9) !important;
  }
  </style>

  <script>
    import {get} from "@/router/axiosuse";
  import {post} from "@/router/axiosuse";
    export default {
      
//下面是数据
      data: () => ({
        imageUrl: '/imgs/mainbg.jpg',
        containerColor: '#ecf0f1',
        ListColor: '#2c3e50',
        // VotesOf_a_Agenda: [],
        buttonDisabled: false,
      VoteCount: 1,
      CreateVote_SelectedItem: null,
      dialognewagenda: false,
      dialognewvote: false,
      dialogCreateVote: false,

      NameOf_NewAgenda: '',
      selectedItems: [],
      AVotes: [
        { 
          Agda_Name: 'ceshi', vcount: '2',
          Vts_Of_Agda: [
            {
              Vt_Name: 'egvt', 
              Choices: [
                'c1', 'c2', '2', '0'
              ]
          },
          {
              Vt_Name: 'egvt2', 
              Choices: [
                'c1', 'c2', '1', '1'
              ]
          }
        ]
      },
     
    ],
      UserInput: [],
      drawer: null,
    }),

    mounted() {
    // 在页面进入后执行的代码
    console.log('huanying');
    
    // 调用你想运行的函数
    this.getvotes();
  },

// 下面是方法
      methods: {

        extractSelection(agenda, selectedItems) {
        this.buttonDisabled = true;
        let temp = [];
        let t = 0;
        // let i = 0, j = 0, k = 0;
        console.log(selectedItems)
          for(let i = 0; i < selectedItems.length; i++){ //2
            temp[i] = []; // 初始化 temp[i]
            for(let j = 0; j < agenda.Vts_Of_Agda.length; j++){ //2
              //对于agenda中的每个投票
              for(let k = 0; k < agenda.Vts_Of_Agda[j].Choices.length; k++){ //4
              //对于这个投票的每个选项, 将已选择的选项(selected items)和所有的选项进行对比
              if (selectedItems[i][t] === agenda.Vts_Of_Agda[i].Choices[k]){
                temp[i][k]='1';//如果选择了这个选项，指示矩阵temp对应位置设1
                t++;
               }
               else temp[i][k]='0';//如果没有选择这个选项，指示矩阵temp对应位置设0
            }
            t = 0;
            }
          }

          console.log(temp);
          //设置投票情况
          for(let i = 0; i < agenda.Vts_Of_Agda.length; i++){
            let p = agenda.Vts_Of_Agda[i].Choices.length;
            p = p/2;//只有后半段是投票情况
            for(let k = 0; k < temp[i].length; k++){
              let sum = 0;
              //提取出字符串，更改为int，加和后放回去
              sum = parseInt(agenda.Vts_Of_Agda[i].Choices[p], 10) + parseInt(temp[i][k], 10);
              agenda.Vts_Of_Agda[i].Choices[p] = sum.toString();
            }
          }
          temp = [];

          //console debug
          for(let i = 0; i < agenda.Vts_Of_Agda.length; i++){
            console.log(`choosing status:`, agenda.Vts_Of_Agda[i].Choices);
          }
        // Process the selected items from other v-select components as needed
      },

        returnavotes(stringavote)
        {  
          const newvotes=[];
          
          const stringvotes=stringavote.split('$$$$');
          for (let i = 0; i < stringvotes.length; i++) {
            const vtsagda = [];
            const avote = stringvotes[i].split('#$$$'); 
            console.log("avote");
            console.log(avote);
            const vts   =    avote[2].split('##$$');
            console.log("vts");
            console.log(vts);
            for(let j= 0; j < vts.length; j++){
              const avt = vts[j].split('###$');
              console.log("avt");
              console.log(avt);
              const newvts={
               
                Vt_Name: avt[0],
              
                //Choices: avt[1].split('####'),
                Choices: ['c1', 'c2', 'c3', '...'],
              }
              vtsagda.push(newvts);
            }
           
    const newVote = {

      Agda_Name: avote[0],
      vcount: avote[1],
      Vts_Of_Agda: vtsagda
         };

    newvotes.push(newVote);
    }

  this.AVotes=newvotes;
      },
        arrtostring(arr,specialstring){
          var a="";
          for (var i = 0; i < arr.length; i++) {
           if(i!=arr.length-1){
           a=a+arr[i]+specialstring;
          
           }
           else{a=a+arr[i];}
            }   
            return a;     
         },

        GiveVoteNum(Ag_name) {
          this.dialogCreateVote = true;
        },

        CreateVote(input, name, CurrentAgenda) {
        // alert(this.AVotes)
        this.UserInput = [];
        this.NameOf_NewVote = '';

          //input一开始会录入一次什么也没有的空值，往后让一位
          for(let i = 0; i < input.length - 1; i++){
              input[i] = input[i+1];
            }
            input.pop();

        //初始化choices数组记录投票情况的部分
            for(let choicL = input.length,j = choicL; j < 2*choicL; j++){
              input.push('0');
            }

        for (let i = 0; i < this.AVotes.length; i++) {
          console.log('CurrentAgenda:', CurrentAgenda);
          console.log('this.AVotes[i].Agda_Name:', this.AVotes[i].Agda_Name);
          if (this.AVotes[i].Agda_Name === CurrentAgenda) {
            // 在找到的对象的 Vts_Of_Agda 数组中添加新数据
            this.AVotes[i].Vts_Of_Agda.push({ Vt_Name: name, Choices: input });
            break; // 找到匹配的 Agda_Name 后结束循环
          }
        }

          // this.VotesOf_a_Agenda = [];
          this.dialogCreateVote = false;
          this.dialognewvote = false;


          this.AVotes = [...this.AVotes]; // 触发 AVotes 的重新渲染
        },

        submitAgenda(name) {
          this.AddNewAgenda(name);
          this.dialognewagenda = false;
      },

      AddNewAgenda(name) {
        console.log(JSON.stringify(this.AVotes))
        const newcard = {
          Agda_Name: name, 
          vcount: 0,
          Vts_Of_Agda: [],
        };
        this.AVotes.push(cloneDeep(newcard));
        // 触发 AVotes 的重新渲染
         this.AVotes = [...this.AVotes]; 
      },

      removeCard(cardID) {
        const index = this.AVotes.findIndex((card) => card.Agda_Name === cardID);
        this.AVotes.splice(index, 1);
      },
      LogOut() {
            this.$router.push({ path: '/LogAndReg' })
        },
        Logged() {
            this.$router.push({ path: '/MainPage' })
        },
        getvotes(){
          console.log("getvotes")
          post(
            '/getvote',
            {
              votes: "getvote",

            },
          ).then(res =>{
            console.log(res.data);
            this.returnavotes(res.data)
           alert("get sucessful");
            
          })
        },

        showvote(){
            console.log("showvote");
            console.log("zzzzzzzzzz");
            console.log(this.AVotes.length);
            var stringvotes="";
            for (var i = 0; i < this.AVotes.length; i++) {
            var avote="";
            var stringvts= "";
           
            let vts=this.AVotes[i].Vts_Of_Agda;
               for (var j = 0; j< vts.length; j++) {
                if(j!=vts.length-1){
                   stringvts=stringvts+vts[j].Vt_Name+"###$"+this.arrtostring(vts[j].Choices,"####")+"##$$";
                }
                else{stringvts=stringvts+vts[j].Vt_Name+"###$"+this.arrtostring(vts[j].Choices,"####")}
                          
           }
          
           
           avote = this.AVotes[i].Agda_Name+"#$$$"+this.AVotes[i].vcount+"#$$$"+stringvts;
           
           console.log("here");
           console.log(avote);
           console.log("here");
           console.log(this.AVotes.length)
           if(i!=this.AVotes.length-1){
           stringvotes=stringvotes+avote+"$$$$";
           
           }
           else{
            stringvotes=stringvotes+avote;
           }
           
          }
          console.log(stringvotes)
            
            post(
            '/showvote',
            {
              votes: stringvotes
             

            },
          ).then(res =>{
            
            console.log(res.data);
           
            alert("sucessful");
           
            console.log(typeof res.data);
            
          })
        },

    },

    components: {
        addVote
      },
    computed: {
      VoteCount() {
        return parseInt(this.CreateVote_SelectedItem, 10);
      },

    }  
    }


  </script>
