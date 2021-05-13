<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	import firebase from 'firebase/app';

	import { FormGroup, Input, Label, Button } from 'sveltestrap/src';
	import authStore from '../store/authStore';

	const schema = yup.object().shape({
		title: yup.string().required().min(5).max(100),
		description: yup.string().required().min(5).max(1000),
		ingredients: yup.array().of(
			yup.object().shape({
				name: yup.string().min(2).max(20).required(),
				units: yup.string().min(2).max(20).required()
			})
		)
	});

	const { form, handleChange, handleSubmit, errors } = createForm({
		initialValues: {
			title: '',
			description: '',
			ingredients: [{ name: '', units: '' }]
		},
		validationSchema: schema,
		onSubmit: async (values) => {
			try {
				const recipe = { ...values, userId: $authStore.userId };
				const db = firebase.firestore();
				const recipesDb = db.collection('recipes');
				await recipesDb.add(recipe);
				console.log('saved');
				alert('saved');
			} catch (e) {
				console.log(e.message);
			}
		}
	});

	const add = () => {
		$form.ingredients = $form.ingredients.concat({ name: '', units: '' });
		$errors.ingredients = $errors.ingredients.concat({ name: '', units: '' });
	};

	const remove = (i) => () => {
		$form.ingredients = $form.ingredients.filter((u, j) => j !== i);
		$errors.ingredients = $errors.ingredients.filter((u, j) => j !== i);
	};
</script>

<div class="row">
	<div class="col">
		<h1>Add Recipe</h1>
	</div>
</div>

<div class="row">
	<div class="col">
		<FormGroup>
			<Label for="title">Recipe Title</Label>
			<Input
				name="title"
				type="text"
				class={$errors.title ? 'is-invalid' : ''}
				on:change={handleChange}
				bind:value={$form.title}
				id="title"
			/>
			{#if $errors.title}
				<div class="invalid-feedback">{$errors.title}</div>
			{/if}
		</FormGroup>
	</div>
</div>

<div class="row">
	<div class="col">
		<FormGroup>
			<Label for="description">Description</Label>
			<Input
				name="description"
				type="textarea"
				rows={10}
				class={$errors.description ? 'is-invalid' : ''}
				on:change={handleChange}
				bind:value={$form.description}
				id="description"
			/>
			{#if $errors.description}
				<div class="invalid-feedback">{$errors.description}</div>
			{/if}
		</FormGroup>
	</div>
</div>

<div class="row">
	<div class="col">
		<Button on:click={add} id="add-ingredient-btn" color="primary">Add Ingredient</Button>
	</div>
</div>

{#each $form.ingredients as ingredient, i (i)}
	<div class="row">
		<div class="col-5">
			<FormGroup>
				<Label for={`ingredients[${i}]name`}>Name</Label>
				<Input
					name={`ingredients[${i}]name`}
					type="text"
					class={$errors.ingredients[i]?.name ? 'is-invalid' : ''}
					on:change={handleChange}
					bind:value={$form.ingredients[i].name}
					id={`ingredients[${i}]name`}
				/>
				{#if $errors.ingredients[i]?.name}
					<div class="invalid-feedback">{$errors.ingredients[i].name}</div>
				{/if}
			</FormGroup>
		</div>
		<div class="col-5">
			<FormGroup>
				<Label for={`ingredients[${i}]units`}>Units</Label>
				<Input
					name={`ingredients[${i}]units`}
					type="text"
					class={$errors.ingredients[i]?.units ? 'is-invalid' : ''}
					on:change={handleChange}
					bind:value={$form.ingredients[i].units}
					id={`ingredients[${i}]units`}
				/>
				{#if $errors.ingredients[i]?.units}
					<div class="invalid-feedback">{$errors.ingredients[i].units}</div>
				{/if}
			</FormGroup>
		</div>

		<div class="col-2">
			<Button
				on:click={remove(i)}
				class="deleteIngredient float-right w-100"
				size="sm"
				color="danger"
			>
				<i class="fas fa-trash" />
			</Button>
		</div>
	</div>
{/each}

<div class="row">
	<div class="col">
		<Button on:click={handleSubmit} color="success" class="float-right">Submit</Button>
	</div>
</div>

<style>
	:global(.deleteIngredient) {
		margin-top: 35px;
	}
</style>
