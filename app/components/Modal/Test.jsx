import { useQueryClient, useMutation } from "@tanstack/react-query";

const TodoAdder = () => {
  const queryClient = useQueryClient();

  const addModule = useMutation({
    mutationFn: async (newModule) => {
      console.log(newModule);
      await fetch("http://localhost:3010/api/modules", {
        method: "POST",
        body: newModule,
      });
    },
  });
  queryClient.invalidateQueries(["modules"]); // Refetch todos across the app
  return (
    <div>
      {addModule.isPending ? (
        "Adding todo..."
      ) : (
        <>
          {addModule.isError ? <div>An error occurred: {addModule.error.message}</div> : null}

          {addModule.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              addModule.mutate({
                module_name: "test",
                description: "This is a test",
              });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
};

export default TodoAdder;
