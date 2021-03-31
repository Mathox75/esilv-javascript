function MyError(param1, param2) {
  var instance = new Error(param1);
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, MyError);
  }
  instance.name = "MyError";
  return instance;
}

try {
  try {
    console.log("im trying");
    eval("function test() {console.log('test');}");
    test();
    throw new Error("test error");
    console.log("Done");
  } catch (error) {
    console.log("Oups error");
    if (error instanceof MyError) {
      console.log(error);
    } else {
      throw error;
    }
  } finally {
    console.log("can do it");
  }
} catch (error) {
  console.log("really bad");
  throw error;
}
