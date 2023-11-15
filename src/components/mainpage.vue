<template>
    <v-app id="inspire">

      <!-- navigation-drawer是左侧导航栏 -->

      <v-navigation-drawer v-model="drawer"
      
      >
        <v-card
          class="pa-4"
          variant="tonal"
          color="#2979FF"
        >
          <v-avatar
            class="mb-4"
            color="grey-darken-1"
            size="64"
          >
        </v-avatar>  
  
          <div>Username here</div>
        </v-card>
  
        <v-divider></v-divider>
  
        <v-list>
        
          <v-list-item
          prepend-icon="mdi-send"
          title="Log Out"
          color="#1C54B2"
          link
          @click="LogOut()"
          >
          </v-list-item> 

          <v-list-item
            prepend-icon="mdi-send"
            title="Make an Agenda"  
            link>

            <v-dialog
            v-model="dialognewagenda"
            activator="parent"
            persistent
            width="1024">
  
            <v-card color="#F5F5F5">
              <v-card-title>
                <span class="text-h5" color="#333333">Make an Agenda! </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
  
                    <!-- <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                      readonly
                      >
                    </v-text-field>
                    </v-col> -->
  
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
                  color="blue-darken-1"
                  variant="text"
                  :ripple="{ class: 'text-red' }"
                  @click="dialognewagenda = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue-darken-4"
                  :ripple="{ class: 'text-green' }"
                  @click="submitAgenda(NameOf_NewAgenda)"
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
      <v-main>
        <v-container
          class="py-8 px-6"
          fluid
          v-model="AContainer"
        >
          <v-row>
            <v-col
              v-for="AVote in AVotes"
              :key="AVote.Agda_Name"
              :id="AVote.Agda_Name"
              cols="12"
            >
            <!-- card是agenda -->
            
              <v-card >
                <!-- toolbar是agenda的表头，包含删除功能 -->
                <v-toolbar :title="AVote.Agda_Name" density="compact">
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
                                hint=""
                                >
                              </v-text-field>
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
                                  v-model="NameOf_NewVote"
                                ></v-text-field>
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
                                  <v-btn prepend-icon="mdi-check-circle" size="large" align-self="center" color="blue-darken-4"
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
                              color="red-darken-1"
                              variant="text"
                              @click="dialogCreateVote = false"
                              :ripple="{ class: 'text-red' }"
                            >
                              Discard
                            </v-btn>
                            <v-btn
                              color="blue-darken-4"
                              variant="text"
                              @click="CreateVote(UserInput, NameOf_NewVote, targetAgenda, vc)"
                              :ripple="{ class: 'text-green' }"
                            >
                              SUBMIT
                            </v-btn>
                          </v-card-actions>
                        </v-list-item>

                      </v-list>
                    
                    </v-dialog>

                    </v-dialog>
          
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
                    :ripple="{ class: 'text-red' }"                   
                    @click="removeCard(AVote.Agda_Name)">
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
                      <!-- <template v-slot:prepend>
                        <v-avatar color="grey-darken-1"></v-avatar>
                      </template> -->
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
    export default {
      
//下面是数据
      data: () => ({

        // VotesOf_a_Agenda: [],
      VoteCount: 1,
      CreateVote_SelectedItem: null,
      dialognewagenda: false,
      dialognewvote: false,
      dialogCreateVote: false,

      NameOf_NewAgenda: '',
      AVotes: [
        {
          Agda_Name: 'eg', vcount: '2',
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
      }
    ],
      UserInput: [],
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'not decided'],
        ['mdi-send', 'Create Vote'],
        ['mdi-delete', 'Create Agenda'],
        ['mdi-alert-octagon', 'Help'],
      ],
    }),



// 下面是方法
      methods: {

        GiveVoteNum(Ag_name) {
          this.dialogCreateVote = true;
          // const num = parseInt(this.CreateVote_SelectedItem, 10);
          // const index = this.AVotes.findIndex((card) => card.Agda_Name === Ag_name);
          // this.AVotes[index][1] = num;
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
