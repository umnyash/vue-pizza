import { defineStore } from "pinia";
import { ReceiveMethod } from "@/common/enums";
import { formatAddress } from "@/common/helpers/formatAddress";
import { useAuthStore, useProfileStore, useCartStore } from "@/stores";
import resources from "@/services/resources";

export const useOrderStore = defineStore("order", {
  state: () => {
    const authStore = useAuthStore();

    return {
      userId: "",
      phone: authStore.user?.phone ?? "",
      receiveMethod: ReceiveMethod.Delivery,
      addressId: null,
      address: {
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
    };
  },
  getters: {
    isPickup(state) {
      return state.receiveMethod === ReceiveMethod.Pickup;
    },
    isDelivery(state) {
      return state.receiveMethod === ReceiveMethod.Delivery;
    },
    isNewAddress(state) {
      return !state.addressId;
    },
  },
  actions: {
    selectPickupReceiveMethod() {
      this.receiveMethod = ReceiveMethod.Pickup;
    },
    selectDeliveryReceiveMethod(addressId) {
      this.receiveMethod = ReceiveMethod.Delivery;

      if (addressId) {
        this.setAddressById(addressId);
      } else if (!this.isNewAddress) {
        // Если был выбран какой-либо сохраннёный адрес и пользователь решил ввести вместо него новый адрес,
        // то нужно очистить поля формы. В ином случае, значит был выбран вариант самовывоза,
        // и если ещё до того, как пользователь выбрал самовывоз он что-то вводил,
        // то лучше не очищать эти данные, на случай если пользователь захочет использовать их.
        this.clearAddress();
      }
    },
    setAddressById(id) {
      const profileStore = useProfileStore();
      const address = profileStore.getAddressById(id);

      this.addressId = address.id;
      this.address.street = address.street;
      this.address.building = address.building;
      this.address.flat = address.flat;
      this.address.comment = address.comment;
    },
    clearAddress() {
      this.addressId = null;
      this.address.street = "";
      this.address.building = "";
      this.address.flat = "";
      this.address.comment = "";
    },
    async sendOrder() {
      const authStore = useAuthStore();
      const cartStore = useCartStore();

      const order = {
        phone: this.phone,
      };

      if (authStore.user) {
        order.userId = authStore.user.id;
      }

      if (this.isDelivery) {
        order.address = this.isNewAddress
          ? this.address
          : { id: this.addressId };
      }

      order.pizzas = cartStore.pizzas.map((pizza) => ({
        name: pizza.name,
        sauceId: pizza.sauceId,
        doughId: pizza.doughId,
        sizeId: pizza.sizeId,
        quantity: pizza.quantity,
        ingredients: Object.entries(pizza.ingredientsCounts).map(
          ([ingredientId, quantity]) => ({
            ingredientId,
            quantity,
          }),
        ),
      }));

      order.misc = Object.entries(cartStore.addonsCounts).map(
        ([miscId, quantity]) => ({
          miscId,
          quantity,
        }),
      );

      const response = await resources.order.createOrder(order);

      if (response.__state === "success") {
        if (!authStore.user || !this.isNewAddress) {
          return;
        }

        const newAddress = {
          ...this.address,
          id: response.data.addressId,
          name: formatAddress(this.address),
          userId: authStore.user.id,
        };

        const profileStore = useProfileStore();
        profileStore.addresses.push(newAddress);
      }
    },
  },
});
