class Delegator {
  proto: any;
  target: any;
  methods: string[];
  getters: string[];
  setters: string[];
  fluents: string[];

  /**
   * Initialize a delegator.
   */
  constructor(proto: Object, target: string) {
    this.proto = proto;
    this.target = target;
    this.methods = [];
    this.getters = [];
    this.setters = [];
    this.fluents = [];
  }

  /**
   * Automatically delegate properties
   * from a target prototype
   */
  static auto(proto: Object, targetProto: Object, targetProp: string) {
    var delegator = new Delegator(proto, targetProp);
    var properties = Object.getOwnPropertyNames(targetProto);
    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];
      var descriptor = Object.getOwnPropertyDescriptor(targetProto, property);
      if (descriptor.get) {
        delegator.getter(property);
      }
      if (descriptor.set) {
        delegator.setter(property);
      }
      if (descriptor.hasOwnProperty("value")) {
        // could be undefined but writable
        var value = descriptor.value;
        if (value instanceof Function) {
          delegator.method(property);
        } else {
          delegator.getter(property);
        }
        if (descriptor.writable) {
          delegator.setter(property);
        }
      }
    }
  }

  /**
   * Delegate method `name`.
   */
  method(name: string): Delegator {
    var proto = this.proto;
    var target = this.target;
    this.methods.push(name);

    proto[name] = function() {
      return this[target][name].apply(this[target], arguments);
    };

    return this;
  }

  /**
   * Delegator accessor `name`.
   */
  access(name: string): Delegator {
    return this.getter(name).setter(name);
  }

  /**
   * Delegator getter `name`.
   */
  getter(name: string): Delegator {
    var proto = this.proto;
    var target = this.target;
    this.getters.push(name);

    proto.__defineGetter__(
      name,
      function() {
        return this[target][name];
      }
    );

    return this;
  }

  /**
   * Delegator setter `name`.
   */
  setter(name: string): Delegator {
    var proto = this.proto;
    var target = this.target;
    this.setters.push(name);

    proto.__defineSetter__(
      name,
      function(val) {
        return (this[target][name] = val);
      }
    );

    return this;
  }

  /**
   * Delegator fluent accessor
   */
  fluent(name: string): Delegator {
    var proto = this.proto;
    var target = this.target;
    this.fluents.push(name);

    proto[name] = function(val) {
      if ("undefined" != typeof val) {
        this[target][name] = val;
        return this;
      } else {
        return this[target][name];
      }
    };

    return this;
  }
}

export { Delegator };
