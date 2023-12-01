<template>
  <div class="col-7">
    <q-card class="my-card col-5 q-mt-lg" flat bordered>
      <q-card-section>
        <div class="text-h6 text-center">Your Itinerary</div>
      </q-card-section>
    </q-card>
    <!-- <q-expansion-item label="json">
      <q-card class="my-card col-5 q-mt-lg" flat bordered>
        <q-card-section>
          <VueJsonPretty :data="json"></VueJsonPretty>
        </q-card-section>
      </q-card>
    </q-expansion-item> -->
    <q-card class="my-card col-5 q-mt-lg" flat bordered>
      <GoogleMap
        :api-key="mapsKey"
        style="width: 100%; height: 200px"
        :center="center"
        :zoom="zoom"
      >
        <MarkerCluster :options="{}">
          <div v-for="item in list" :key="item">
            <Marker
              :options="{
                title: itineraryList[item].name,
                position: itineraryList[item].position,
              }"
            />
          </div>
        </MarkerCluster>
      </GoogleMap>
    </q-card>
    <q-card class="my-card col-5 q-mt-lg" flat bordered>
      <q-tabs
        v-model="date"
        inline-label
        mobile-arrows
        class="text-white shadow-2"
      >
        <div v-for="d in dates" :key="d">
          <q-tab :name="d" :label="d" />
        </div>
      </q-tabs>
      <q-separator dark />
      <q-tab-panels v-model="date">
        <q-tab-panel v-for="(d, i) in dates" :key="d" :name="d">
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="height: 200px"
          >
            <div v-for="item in list" :key="item">
              <q-card-section>
                {{ json.itinerary[i][item].name }}
              </q-card-section>
            </div>
          </q-scroll-area>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty';
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map';

const props = defineProps<{ itinerary: string }>();

const json = JSON.parse(props.itinerary);

const { mapsKey } = useRuntimeConfig().public;
const center = ref({ ...json.city_location });
const zoom = ref(10);
const list = [
  'breakfast',
  'lunch',
  'dinner',
  'attraction1',
  'attraction2',
  'attraction3',
];
const itineraryList = ref(json.itinerary[0]);
const dates = json.itinerary.map((item: { date: any }) => item.date);
const date = ref(dates[0]);
console.log('dates :>> ', dates);
const locations = ref(list);

const barStyle = ref({
  right: '2px',
  borderRadius: '9px',
  width: '9px',
  opacity: 0.2,
});

const thumbStyle = {
  right: '4px',
  borderRadius: '5px',
  width: '5px',
  opacity: 0.75,
};
</script>