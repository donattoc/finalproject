<template>

  <div id="face" v-bind:class="amandpm">
    <div>{{time}}</div>
    <div>{{date}}</div>
    
  <h3 class="truncate"     
  @mouseover="hover = true"
  @mouseleave="hover =false" >{{label}}</h3>

    

</div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ZonedDateTime, ZoneId, DateTimeFormatter } from "@js-joda/core";
import "@js-joda/timezone";
import "@js-joda/locale_en-us";
import { Locale } from "@js-joda/locale_en-us";
const timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

// To show the month name, the Locale must be set
const dateFormatter = DateTimeFormatter.ofPattern("MMM d").withLocale(
Locale.US
);
@Component
export default class WorldClockExport extends Vue {
  @Prop() timeZone!: string;
  @Prop() label!: string;
  amandpm = "";
  zdt: ZonedDateTime | null = ZonedDateTime.now();
  timer: number | null = null;
  
  get time(): string {
    return this.zdt?.format(timeFormatter) ?? "00:00";
  }


  get date(): string {
    // console.log("Local date", this.zdt?.format(dateFormatter));
    return this.zdt?.toLocalDate().format(dateFormatter) ?? "what";
  }

  mounted(): void {
    this.zdt = ZonedDateTime.now(ZoneId.of(this.timeZone));
    if (this.zdt.hour() >=12) {
      this.amandpm="pm";
    }
    else {
      this.amandpm="am";
    }
    this.timer = setInterval(() => {
      this.zdt = ZonedDateTime.now(ZoneId.of(this.timeZone));
    }, 1000);
    // console.log("here", this.timeZone, zdt.toString());
  }

  beforeDestroy(): void {
    if (this.timer) {
      console.log("Delete timer");
      clearInterval(this.timer);
      this.timer = null;
    }
  }


}
</script>


<style scoped>
#face {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
  border-radius: 0.5em;
  padding: 0.5em;
  margin: 4px;
  width: 10em;
}
.pm {
  color: red;
}
.am {
  color: purple;
}
#face:hover {
  transform: scale(2.5em);
}
#face div:first-child {
  font-size: 200%;
}
.truncate {
  max-width: 5em;
  white-space: nowrap; /* disable text wrap */
  overflow: hidden;
}

.truncate:hover {
  max-width: 10em;
  text-overflow: clip;
  overflow: auto;
}
</style>