<template>
    <v-app id="inspire">

      <!-- navigation-drawer是左侧导航栏 -->

      <v-navigation-drawer v-model="drawer"
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
      <v-main :style="{ backgroundColor: containerColor }">
        <v-container
          class="py-8 px-6 #ecf0f1 "
          :style="{ backgroundColor: containerColor }"
          fluid
          v-model="AContainer"
        >
          <v-row>
            <v-col
              v-for="AVote in AVotes"
              :key="AVote.Agda_Name"
              :id="AVote.Agda_Name"
              cols="12"
              color="#ecf0f1"
            >
            <!-- card是agenda -->
            
              <v-card prepend-icon="mdi-vote">
                <!-- toolbar是agenda的表头，包含删除功能 -->
                <v-toolbar :title="AVote.Agda_Name" density="compact" color="#ecf0f1">
                  <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
                      <!-- 添加投票Vote -->
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
                    color="primary">
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
                  <template v-for="v in AVote.Vts_Of_Agda " :key="v.Vt_Name">
                    <v-list-item >
                      <v-list-item-title>{{ v.Vt_Name }}</v-list-item-title>
                      <template v-slot:prepend>
                        <v-avatar icon="mdi-vote"></v-avatar>
                      </template>
                        <v-select label="Select" multiple :items="v.Choices">

                        </v-select>
                    </v-list-item>
  
                    <!-- <v-divider
                      v-if="n !== AVote.vcount"
                      :key="`divider-${n}`"
                      inset
                    ></v-divider> -->
                  </template>
                </v-list>
                <!-- 提交按钮Submit -->

              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  

  <script setup>
    import { ref } from 'vue'
    import addVote from '@/components/AddVote.vue'
    import cloneDeep from 'lodash/cloneDeep';

    const drawer = ref(null)

  </script>
  
  <script>
    import {get} from "@/router/axiosuse";
  import {post} from "@/router/axiosuse";
    export default {
      
//下面是数据
      data: () => ({

        containerColor: '#ecf0f1',
        ListColor: '#2c3e50',
        // VotesOf_a_Agenda: [],
      VoteCount: 1,
      CreateVote_SelectedItem: null,
      dialognewagenda: false,
      dialognewvote: false,
      dialogCreateVote: false,

      NameOf_NewAgenda: '',
      AVotes: [
        { 
          Agda_Name: 'ceshi', vcount: '2',
          Vts_Of_Agda: [
            {
              Vt_Name: 'egvt', 
              Choices: [
                'c1', 'c2', 'c3', '...'
              ]
          },
          {
              Vt_Name: 'egvt2', 
              Choices: [
                'c1', 'c2', 'c3', '...'
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

        CreateVote(input, name, CurrentAgenda, vc) {
        // alert(this.AVotes)
        this.UserInput = [];
        this.NameOf_NewVote = '';

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
      }
    }  
    }


  </script>
