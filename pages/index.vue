<template>
  <div class="row justify-center">
    <q-card class="my-card col-5 q-mt-lg" flat bordered>
      <q-card-section>
        <div class="text-h5 text-center">Where are you going?????</div>
      </q-card-section>
      <q-separator dark />
      <q-form class="row items-center justify-center q-my-md" @submit="sendIt">
        <div class="q-mx-md q-mt-md col-6 items-start">
          <q-select
            v-model="country"
            outlined
            label="Country"
            :options="countries"
            lazy-rules="ondemand"
            :rules="[(val) => (val !== null && val !== '') || 'Required Field']"
          />
        </div>
        <div class="q-mx-md q-mt-md col-6 items-start">
          <q-select
            v-model="city"
            outlined
            label="City"
            :options="cities"
            lazy-rules="ondemand"
            :rules="[(val) => (val !== null && val !== '') || 'Required Field']"
          />
        </div>
        <!-- <div class="row justify-betweenq-mx-md qmt-md col-6">
          <q-input class="text-center bg-primary" v-model="startDate" :bottom-slots="false" disable borderless />
          <span>-</span>
          <q-input v-model="endDate" disable readonly :label-slot="false" borderless />
        </div> -->
        <div class="row col-6 justify-center q-mx-md q-my-md">
          <q-date class="col-12" bordered flat v-model="dateRange" range />
        </div>
        <div class="col-6 q-my-md">
          <q-btn
            type="submit"
            color="primary"
            :disable="fetching"
            :loading="fetching"
            :ripple="{ center: true }"
          >
            Submit
          </q-btn>
        </div>
      </q-form>
    </q-card>
    <!-- <q-card class="my-card col-5 q-mt-lg" flat bordered> -->
    <!-- <GoogleMap
        :api-key="mapsKey"
        style="width: 100%; height: 500px"
        :center="center"
        :zoom="zoom"
      >
        <MarkerCluster :options="{}">
          <div v-for="m in locations" :key="m.label">
            <Marker :options="m" />
          </div>
        </MarkerCluster>
      </GoogleMap> -->
    <!-- </q-card> -->
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#app';
import { CreateCompletionResponse } from 'openai';
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map';
const { mapsKey } = useRuntimeConfig().public;

const locations = ref({
  FCB: {
    title: 'FCB',
    label: 'FC Bayern München',
    position: {
      lat: 48.21888549557031,
      lng: 11.625109549171704,
    },
  },
  SCF: {
    title: 'SCF',
    label: 'SC Freiburg',
    position: {
      lat: 48.021196964093434,
      lng: 7.82996300258625,
    },
  },
  RBL: {
    title: 'RBL',
    label: 'Red Bull Leipzig',
    position: {
      lat: 51.34762220651972,
      lng: 12.35519705573161,
    },
  },
  FCUB: {
    title: 'FCUB',
    label: 'Union Berlin',
    position: {
      lat: 52.45755304910101,
      lng: 13.568600380052235,
    },
  },
  BVB: {
    title: 'BVB',
    label: 'BVB Borussia Dortmund',
    position: {
      lat: 51.492787217050754,
      lng: 7.452501674962833,
    },
  },
});
// const center = { lat: 40.689247, lng: -74.044502 }
const center = ref({ lat: 51.075857938487424, lng: 10.313596029890055 });
const markerOptions = { position: center, label: 'L', title: 'LADY LIBERTY' };
const zoom = ref(6);
let fetching = ref(false);
const city = ref('');
const country = ref('');
const dateRange = ref({ from: '', to: '' });
const startDate = computed(() => {
  return dateRange.value.from ? dateRange.value.from : '';
});
const endDate = computed(() => {
  return dateRange.value.to ? dateRange.value.to : '';
});

const countries = ['United States'];
const cities = ['Denver', 'Los Angelas'];

const sendIt = async () => {
  fetching.value = true;
  const { data } = await useFetch('/api/fetch-gpt-response', {
    method: 'POST',
    body: {
      country,
      city,
      startDate,
      endDate,
    },
  });
  fetching.value = false;

  useItineraryData().setItineraryData(
    data.value?.response as CreateCompletionResponse
  );

  await navigateTo({
    path: '/itinerary',
  });
};
</script>