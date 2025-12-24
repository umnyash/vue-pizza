import { defineStore } from "pinia";
import resources from "@/services/resources";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: [],
    orders: [],
  }),
  getters: {
    getAddressById(state) {
      return (id) => state.addresses.find((address) => address.id === id);
    },
  },
  actions: {
    setAddresses(addresses) {
      this.addresses = addresses;
    },
    setOrders(orders) {
      this.orders = orders;
    },
    async addAddress(address) {
      const response = await resources.address.addAddress(address);

      if (response.__state === "success") {
        this.addresses.push(response.data);
      }
    },
    async updateAddress(address) {
      const response = await resources.address.updateAddress(address);

      if (response.__state === "success") {
        const addressIndex = this.addresses.findIndex(
          ({ id }) => address.id === id,
        );

        this.addresses.splice(addressIndex, 1, address);
      }
    },
    async removeAddress(addressId) {
      const response = await resources.address.removeAddress(addressId);

      if (response.__state === "success") {
        const addressIndex = this.addresses.findIndex(
          ({ id }) => addressId === id,
        );

        this.addresses.splice(addressIndex, 1);
      }
    },
  },
});
