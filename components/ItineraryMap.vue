<template>
  <div>
    <GoogleMap
      :api-key="mapsKey"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="zoom"
    >
      <MarkerCluster :options="{}">
        <div v-for="m in locations" :key="m.name">
          <Marker :options="{ title: m.name, position: m.position }" />
        </div>
      </MarkerCluster>
    </GoogleMap>
  </div>
</template>

<script setup>
const props = defineProps({
  locations: Object,
  center: Object,
  zoom: Number,
});
</script>