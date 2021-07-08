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
                  :search="search"
                  :sort-desc="[true, true]"
                >
                  <template #item.replay="{ value }">
                    <a :href="`${value}`" target="_blank">
                      Click to watch
                    </a>
                  </template>
                  <template v-slot:top>
                    <v-text-field
                      :color="$store.state.primaryColor"
                      v-model="search"
                      label="Search"
                      class="mx-4"
                    ></v-text-field>
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
                  :search="search"
                  :sort-desc="[true, true]"
                >
                  <template v-slot:top>
                    <v-text-field
                      :color="$store.state.primaryColor"
                      v-model="search"
                      label="Search"
                      class="mx-4"
                    ></v-text-field>
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
                  :search="search"
                  :sort-desc="[true, true]"
                >
                  <template v-slot:top>
                    <v-text-field
                      :color="$store.state.primaryColor"
                      v-model="search"
                      label="Search"
                      class="mx-4"
                    ></v-text-field>
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
                  :search="search"
                  :sort-desc="[true, true]"
                >
                  <template v-slot:top>
                    <v-text-field
                      :color="$store.state.primaryColor"
                      v-model="search"
                      label="Search"
                      class="mx-4"
                    ></v-text-field>
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
                  :search="search"
                  :sort-desc="[true, true]"
                >
                  <template v-slot:top>
                    <v-text-field
                      :color="$store.state.primaryColor"
                      v-model="search"
                      label="Search"
                      class="mx-4"
                    ></v-text-field>
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
                  :search="search"
                  :sort-desc="[true, true]"
                >
                  <template v-slot:top>
                    <v-text-field
                      :color="$store.state.primaryColor"
                      v-model="search"
                      label="Search"
                      class="mx-4"
                    ></v-text-field>
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
      level1: [],
      level2: [],
      level3: [],
      level4: [],
      level5: [],
      level6: [],
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
        { text: "Game Play Replay", value: "replay" },
      ];
    },
  },
  mounted: async function() {
    this.$store.state.isLoading = true;
    await this.init();
    this.$store.state.isLoading = false;
  },
  methods: {
    getSkyData: async function() {
      var test = await this.$store.state.skyClient.db.getJSON(
        this.$store.state.publicKey,
        this.$store.state.appSecret
      );
      return test;
    },
    init: async function() {
      var test = await this.getSkyData();
      console.log("player data: ", test);
      if (!test.data) {
        this.$store.dispatch("warning", "No Players have played the game");
      } else {
        var data = test.data.players;
        data.map((player) => {
          switch (player.level) {
            case 1:
              this.level1.push(player);
              break;
            case 2:
              this.level2.push(player);
              break;
            case 3:
              this.level3.push(player);
              break;
            case 4:
              this.level4.push(player);
              break;
            case 5:
              this.level5.push(player);
              break;
            case 6:
              this.level6.push(player);
              break;
          }
        });
      }
    },
  },
};
</script>

<style></style>
