<template>
  <v-row justify="center">
    <v-dialog v-model="$store.state.leaderboardDialog" persistent>
      <v-card>
        <v-card-title class="text-h5">
          Leaderboard
        </v-card-title>
        <v-tabs :color="$store.state.primaryColor" right>
          <v-tab>Difficulty 1</v-tab>
          <v-tab> Difficulty2</v-tab>
          <v-tab>Difficulty 3</v-tab>
          <v-tab>Difficulty 4</v-tab>
          <v-tab>Difficulty 5</v-tab>
          <v-tab>Difficulty 6</v-tab>
          <v-tab-item>
            <v-container fluid>
              <div>
                <v-data-table
                  :sort-by="['score', 'time']"
                  multi-sort
                  :headers="headers"
                  :items="level1"
                  item-key="address"
                  class="elevation-1"
                  :search="search"    :sort-desc="[true, true]"

                >
                  <template v-slot:top>
                    <v-text-field
                      :color="$store.state.primaryColor"
                      v-model="search"
                      label="Search"
                      class="mx-4"
                    ></v-text-field>
                  </template>
                  <template v-slot:body.append>
                    <tr>
                      <td></td>
                      <td>
                        <v-text-field
                          v-model="calories"
                          type="number"
                          label="Less than"
                        ></v-text-field>
                      </td>
                      <td colspan="4"></td>
                    </tr>
                  </template>
                </v-data-table></div
            ></v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid>
              <div>
                <v-data-table
                  :sort-by="['score', 'time']"
                  multi-sort
                  :headers="headers"
                  :items="level2"
                  item-key="address"
                  class="elevation-1"
                  :search="search"    :sort-desc="[true, true]"

                >
                  <template v-slot:top>
                    <v-text-field
                      :color="$store.state.primaryColor"
                      v-model="search"
                      label="Search"
                      class="mx-4"
                    ></v-text-field>
                  </template>
                  <template v-slot:body.append>
                    <tr>
                      <td></td>
                      <td>
                        <v-text-field
                          v-model="calories"
                          type="number"
                          label="Less than"
                        ></v-text-field>
                      </td>
                      <td colspan="4"></td>
                    </tr>
                  </template>
                </v-data-table></div
            ></v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid>
              <div>
                <v-data-table
                  :sort-by="['score', 'time']"
                  multi-sort
                  :headers="headers"
                  :items="level3"
                  item-key="address"
                  class="elevation-1"
                  :search="search"    :sort-desc="[true, true]"

                >
                  <template v-slot:top>
                    <v-text-field
                      :color="$store.state.primaryColor"
                      v-model="search"
                      label="Search"
                      class="mx-4"
                    ></v-text-field>
                  </template>
                  <template v-slot:body.append>
                    <tr>
                      <td></td>
                      <td>
                        <v-text-field
                          v-model="calories"
                          type="number"
                          label="Less than"
                        ></v-text-field>
                      </td>
                      <td colspan="4"></td>
                    </tr>
                  </template>
                </v-data-table></div
            ></v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid>
              <div>
                <v-data-table
                  :sort-by="['score', 'time']"
                  multi-sort
                  :headers="headers"
                  :items="level4"
                  item-key="address"
                  class="elevation-1"
                  :search="search"    :sort-desc="[true, true]"

                >
                  <template v-slot:top>
                    <v-text-field
                      :color="$store.state.primaryColor"
                      v-model="search"
                      label="Search"
                      class="mx-4"
                    ></v-text-field>
                  </template>
                  <template v-slot:body.append>
                    <tr>
                      <td></td>
                      <td>
                        <v-text-field
                          v-model="calories"
                          type="number"
                          label="Less than"
                        ></v-text-field>
                      </td>
                      <td colspan="4"></td>
                    </tr>
                  </template>
                </v-data-table></div
            ></v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid>
              <div>
                <v-data-table
                  :sort-by="['score', 'time']"
                  multi-sort
                  :headers="headers"
                  :items="level5"
                  item-key="address"
                  class="elevation-1"
                  :search="search"    :sort-desc="[true, true]"

                >
                  <template v-slot:top>
                    <v-text-field
                      :color="$store.state.primaryColor"
                      v-model="search"
                      label="Search"
                      class="mx-4"
                    ></v-text-field>
                  </template>
                  <template v-slot:body.append>
                    <tr>
                      <td></td>
                      <td>
                        <v-text-field
                          v-model="calories"
                          type="number"
                          label="Less than"
                        ></v-text-field>
                      </td>
                      <td colspan="4"></td>
                    </tr>
                  </template>
                </v-data-table></div
            ></v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid>
              <div>
                <v-data-table
                  :sort-by="['score', 'time']"
                  multi-sort
                  :headers="headers"
                  :items="level6"
                  item-key="address"
                  class="elevation-1"
                  :search="search"    :sort-desc="[true, true]"

                >
                  <template v-slot:top>
                    <v-text-field
                      :color="$store.state.primaryColor"
                      v-model="search"
                      label="Search"
                      class="mx-4"
                    ></v-text-field>
                  </template>
                  <template v-slot:body.append>
                    <tr>
                      <td></td>
                      <td>
                        <v-text-field
                          v-model="calories"
                          type="number"
                          label="Less than"
                        ></v-text-field>
                      </td>
                      <td colspan="4"></td>
                    </tr>
                  </template>
                </v-data-table></div
            ></v-container>
          </v-tab-item>
        </v-tabs>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="$store.state.primaryColor"
            text
            @click="$store.state.leaderboardDialog = false"
          >
            Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      level1: [
        {
          address:
            "0xcf5b4e30bC1aD46DDb6B593b427A457AF449e0f0" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 20220),
          score: Math.round(Math.random() * 2020200201111),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
      ],
      level2: [
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
      ],
      level3: [
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
      ],
      level4: [
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
      ],
      level5: [
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
      ],
      level6: [
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
        {
          address:
            "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f" +
            Math.round(Math.random() * 10),
          time: Math.round(Math.random() * 202020020),
          score: Math.round(Math.random() * 202020020),
          level: 1,active:true
        },
      ],
      data: {
        scores: [],
      },
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Address",
          align: "start",
          sortable: true,
          value: "address",
        },
        {
          text: "Level",
          value: "level",
          sortable: true,
        },
        { text: "Time", value: "time" },
        { text: "Score", value: "score" },
        { text: "Tournament Active", value: "active" },
      ];
    },
  },
  methods: {
    getSkyData: async function() {
      var test = await this.$store.state.skyClient.db.getJSON(
        publicKey,
        appSecret
      );
      return test;
    },
    init: async function() {
      var test = await this.getSkyData();
      var tempData = { players: [] };
      if (!test) {
        this.$store.dispatch("warning", "No Players have played the game");
      } else {
        var data = test.players;
        data.map((player) => {
          var tempScores = player.scores;
          tempScores.map((score) => {
            switch (score.level) {
              case 1:
                this.level1.push(score);
                break;
              case 2:
                this.level2.push(score);
                break;
              case 3:
                this.level3.push(score);
                break;
              case 4:
                this.level4.push(score);
                break;
              case 5:
                this.level5.push(score);
                break;
              case 6:
                this.level6.push(score);
                break;
            }
          });
        });
      }
    },
  },
};
</script>

<style></style>
