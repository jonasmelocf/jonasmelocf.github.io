<script setup lang="ts">
import { Play } from "@lucide/vue";
import { ref } from "vue";
import Button from "@/components/Button.vue";
import Field from "@/components/Field.vue";
import Input from "@/components/Input.vue";
import { playParticles } from "../animations/particles";

const text = ref("✨");
const amount = ref(4);
const spread = ref(0);
const duration = ref(0);
const size = ref(0);

function onClick(e: MouseEvent) {
	playParticles(amount.value, {
		x: e.x,
		y: e.y,
		text: text.value || "🔵",
		spread: spread.value || undefined,
		duration: duration.value || undefined,
		size: size.value || undefined,
	});
}
</script>

<template>
	<div class="grid gap-2 mt-8 items-center">
		<Field label="Text" inline> <Input v-model="text" /> </Field>
		<Field label="Amount" inline>
			<Input type="range" :min="0" :max="64" v-model.number="amount" />
			<code>{{ amount }}</code>
		</Field>
		<Field label="Spread" inline>
			<Input type="range" :min="0" :max="1024" v-model.number="spread" />
			<code>{{ spread || "default" }}</code>
		</Field>
		<Field label="Duration" inline>
			<Input type="range" :min="0" :max="4000" v-model.number="duration" />
			<code>{{ duration ? `${duration}ms` : "default" }}</code>
		</Field>
		<Field label="Size" inline>
			<Input type="range" :min="0" :max="512" v-model.number="size" />
			<code>{{ size ? `${size}px` : "default" }}</code>
		</Field>

		<Button @click="onClick" size="lg"> <Play /> </Button>
	</div>
</template>
