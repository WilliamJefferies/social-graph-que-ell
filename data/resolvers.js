import { Friends } from "./dbConnectors";
// resolver map
export const resolvers = {
  Query: {
    getOneFriend: (root, { id }) => {
      return new Promise((resolve, reject) => {
        Friends.findById(id, (err, friend) => {
          if (err) reject(err);
          else resolve(friend);
        });
      });
    },
  },
  Mutation: {
    createFriend: (root, { input }) => {
      const newFriend = new Friends({
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        language: input.language,
        age: input.age,
        email: input.email,
        contacts: input.contacts,
      });

      newFriend.id = newFriend._id;

      return new Promise((resolve, reject) => {
        newFriend.save((err) => {
          if (err) reject(err);
          else resolve(newFriend);
        });
      });
    },

    updateFriend: (root, { input }) => {
      return new Promise((resolve, reject) => {
        Friends.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (err, friend) => {
            if (err) reject(err);
            else resolve(friend);
          }
        );
      });
    },

    deleteFriend: (root, { id }) => {
      return new Promise((resolve) => {
        Friends.remove({ _id: input.id }),
          (err) => {
            if (err) reject(err);
            else resolve("Successfully deleted friend");
          };
      });
    },
  },
};
