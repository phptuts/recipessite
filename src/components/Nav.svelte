<script lang="ts">
	import authStore from '../store/authStore';

	import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'sveltestrap';

	let isOpen = false;

	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}

	function logout() {}
</script>

<Navbar color="light" light expand="md">
	<NavbarBrand href="/">Recipe Site</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav navbar>
			<NavItem>
				<NavLink href="/recipes">Recipes</NavLink>
			</NavItem>
			{#if $authStore.isLoggedIn}
				<NavItem>
					<NavLink href="/add-recipe">Add Recipe</NavLink>
				</NavItem>
			{/if}

			{#if !$authStore.isLoggedIn}
				<NavItem>
					<NavLink href="/login">Login</NavLink>
				</NavItem>
			{/if}
			{#if $authStore.isLoggedIn}
				<NavItem>
					<NavLink on:click={logout}>Logout</NavLink>
				</NavItem>
			{/if}
		</Nav>
	</Collapse>
</Navbar>
