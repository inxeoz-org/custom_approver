<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import ShowAppointment from "@src/routes/ShowAppointment.svelte";
    import { Card, Button, Badge } from "flowbite-svelte";
    import {
        approveAppointment,
        getAppointmentList,
        rejectAppointment,
    } from "@src/api.js";
    import type { Appointment } from "@src/app.js";
    import { badgeClass } from "@src/utils.js";
    // --- public props (adjustable) ---
    export let limitStart = 0;
    export let pageLength = 20;

    export let heading = "Darshan Management Console";
    export let subtitle =
        "Workspace for Protocol Officer & Approver. Monitoring status as of today.";
    export let sectionTitle = "Booking Summaries";

    // --- local state ---
    let loading = false;
    let error: string | null = null;

    let show = false;
    let selectedId: string | null = null;

    let appointmentList: Appointment[] = [];

    // --- API calls ---
    async function refresh_appointments() {
        const result = await getAppointmentList();
        appointmentList = result?.message;
    }

    onMount(() => {
        loading = true;
        refresh_appointments().then(() => {
            loading = false;
        });
    });

    // --- UI actions ---
    function openModal(id: string) {
        selectedId = id;
        show = true;
    }
    function handleModalClose() {
        show = false;
    }
</script>

<div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-6xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-start justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-extrabold text-slate-800">
                        {heading}
                    </h1>
                    <p class="text-sm text-slate-500 mt-1">{subtitle}</p>
                </div>
                <div class="flex items-center gap-3">
                    <Button
                        color="light"
                        onclick={() => {
                            refresh_appointments();
                        }}
                        disabled={loading}
                    >
                        {#if loading}Refreshing...{:else}Refresh{/if}
                    </Button>
                </div>
            </div>

            <h2 class="text-lg font-bold text-slate-700 mt-6 mb-3">
                {sectionTitle}
            </h2>

            <!-- Pending Bookings list -->
            <div class="mt-6 bg-slate-50 p-4 rounded-xl">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-slate-700">
                        Bookings Pending Verification
                    </h3>
                    <div class="text-sm text-slate-500">
                        Approve / Reject per booking below
                    </div>
                </div>

                {#if error}
                    <div class="text-red-600 mb-3">Error: {error}</div>
                {/if}

                <div class="mb-3">
                    <input
                        placeholder="Search by ID, name, or type"
                        class="w-full rounded-md border p-2"
                    />
                </div>

                <div class="overflow-x-auto rounded-lg">
                    <table class="min-w-full bg-white">
                        <thead>
                            <tr
                                class="text-left text-xs uppercase text-slate-500"
                            >
                                <th class="p-3">Booking ID</th>

                                <th class="p-3">Devotee Name</th>
                                <th class="p-3">Date</th>
                                <th class="p-3">Status</th>
                                <th class="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#if loading && appointmentList.length === 0}
                                <tr
                                    ><td colspan="6" class="p-4 text-slate-500"
                                        >Loading appointmentList…</td
                                    ></tr
                                >
                            {:else if appointmentList.length === 0}
                                <tr
                                    ><td colspan="6" class="p-4 text-slate-500"
                                        >No appointmentList found for the
                                        current filters.</td
                                    ></tr
                                >
                            {:else}
                                {#each appointmentList as b}
                                    <tr class="border-t">
                                        <td class="p-3 font-medium">{b.name}</td
                                        >

                                        <td class="p-3">{b.devoteee_id}</td>
                                        <td class="p-3 text-sm text-slate-500"
                                            >{b.slot_date}</td
                                        >
                                        <td class="p-3"
                                            ><Badge
                                                color={badgeClass(
                                                    b.workflow_state,
                                                )}>{b.workflow_state}</Badge
                                            ></td
                                        >
                                        <td class="p-3">
                                            <div class="flex gap-2">
                                                <Button
                                                    color="light"
                                                    size="xs"
                                                    onclick={() =>
                                                        openModal(b.name)}
                                                    >Open</Button
                                                >
                                            </div>
                                        </td>
                                    </tr>
                                {/each}
                            {/if}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

{#if show && selectedId}
    <ShowAppointment appointment_id={selectedId} on:close={handleModalClose} />
{/if}

<style>
    /* small layout tweaks to match the screenshot's look */
    :global(.card) {
        border-radius: 12px;
    }
</style>
