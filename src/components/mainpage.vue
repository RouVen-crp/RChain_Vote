<template>
    <v-app id="inspire">

      <!-- navigation-drawer是左侧导航栏 -->

      <v-navigation-drawer v-model="drawer"
      >
        <v-card
          class="pa-4"
          variant="tonal"
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
          link
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
  
            <v-card>
              <v-card-title>
                <span class="text-h5">User Profile</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
  
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                      readonly
                      >
                    </v-text-field>
                    </v-col>
  
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        label="Name of your new Agenda"
                        hint="example: Please vote for Joe Biden!"
                        required
                      ></v-text-field>
                    </v-col>
  
  
                    <v-col cols="12">
                      <v-text-field
                        label="Number of Votes in your new Agenda*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Password*"
                        type="password"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        :items="['0-17', '18-29', '30-54', '54+']"
                        label="Age*"
                        required
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-autocomplete
                        :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                        label="Interests"
                        multiple
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="dialognewagenda = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="dialognewagenda = false"
                >
                  Save
                </v-btn>
              </v-card-actions>
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
        >
          <v-row>
            <v-col
              v-for="card in cards"
              :key="card.id"
              cols="12"
            >
            <!-- card是agenda -->
              <v-card v-if="!isDeleted">
                <!-- toolbar是agenda的表头，包含删除功能 -->
                <v-toolbar :title="card.title" density="compact">
                  <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
                      <!-- 添加投票Vote -->
                      <v-dialog
                      v-model="dialognewvote"
                      persistent
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
                          <span class="text-h5">User Profile</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>

                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-text-field
                                :label="card.title"
                                hint=""
                                readonly
                                >
                              </v-text-field>
                              </v-col>

                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-text-field
                                  label="Name of your new Agenda"
                                  hint="example: Please vote for Joe Biden!"
                                  required
                                ></v-text-field>
                              </v-col>


                              <v-col cols="12">
                                <v-text-field
                                  label="Number of Votes in your new Agenda*"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="Password*"
                                  type="password"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-select
                                  :items="['0-17', '18-29', '30-54', '54+']"
                                  label="Age*"
                                  required
                                ></v-select>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-autocomplete
                                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                  label="Interests"
                                  multiple
                                ></v-autocomplete>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="dialognewvote = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="dialognewvote = false"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
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
                    @click="removeCard(card.id)">
                      Delete
                    </v-btn>
          
                  </v-menu>
                  
                </v-toolbar>
                
                <!-- 下面是每个agenda的具体投票项目 -->
                <v-list lines="two">
                  <!-- <v-list-subheader :title="card"></v-list-subheader> -->
                  <template v-for="n in 6" :key="n">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-avatar color="grey-darken-1"></v-avatar>
                      </template>
  
                      <v-list-item-title :title="`Message ${n}`"></v-list-item-title>
  
                      <!-- <v-list-item-subtitle title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique"></v-list-item-subtitle> -->
                    </v-list-item>
  
                    <v-divider
                      v-if="n !== 6"
                      :key="`divider-${n}`"
                      inset
                    ></v-divider>
                  </template>
                </v-list>
                <!-- 提交按钮Submit -->
                <v-btn align="right">

                </v-btn> 
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
    // const cards = [
    //       {id: 1, title: 'Agenda1'},
    //       {id: 2, title: 'Agenda2'},
    //     ]
    // const links = [
    //     ['mdi-inbox-arrow-down', 'not decided'],
    //     ['mdi-send', 'Create Vote'],
    //     ['mdi-delete', 'Create Agenda'],
    //     ['mdi-alert-octagon', 'Help'],
    // ]

    const drawer = ref(null)
  </script>
  
  <script>
    export default {
      
//下面是数据
      data: () => ({
        dialognewagenda: false,
        dialognewvote: false,
        AgendaName: 'null',
        cards: [
          {id: 1, title: 'Agenda1'},
          {id: 2, title: 'Agenda2'},
        ],
        drawer: null,
        links : [
        ['mdi-inbox-arrow-down', 'not decided'],
        ['mdi-send', 'Create Vote'],
        ['mdi-delete', 'Create Agenda'],
        ['mdi-alert-octagon', 'Help'],
    ],
      }),

// 下面是方法
      methods: {
      removeCard(cardID) {
        const index = this.cards.findIndex((card) => card.id === cardID);
        this.cards.splice(index, 1);
      },
      // print(card) {
        
      //   alert(card.Array)
      // }

    },
    components: {
        addVote
      }
    }


  </script>
