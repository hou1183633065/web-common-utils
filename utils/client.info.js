import system from "./system.info";

export default {
  ...system,
  hostname: location.hostname,
  port: location.port,
  href: location.href,
  origin: location.origin,
  protocol: location.protocol.replace(":", ""),
  tools: ""
};
