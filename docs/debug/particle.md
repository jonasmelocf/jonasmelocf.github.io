<script setup>
import { defineClientComponent } from "vitepress";
const ParticleDebugger = defineClientComponent(() => import("@/features/particle/ParticleDebugger.vue"));
</script>

# Particle

<ParticleDebugger/>
