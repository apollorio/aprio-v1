const fs=require("fs");const path=require("path");
const root="D:/dev/_apollo.rio.br/plugins";
const j=JSON.parse(fs.readFileSync(path.join(root,"_inventory/apollo-registry.json"),"utf8"));
const layers=(j.architecture&&j.architecture.layers)||{};
const layerOf={};
for (const [L,v] of Object.entries(layers)) {
  const list=Array.isArray(v)?v:(v&&v.plugins)||[];
  for (const s of list) layerOf[s]=L;
}
const disk=fs.readdirSync(root,{withFileTypes:true}).filter(d=>d.isDirectory()&&d.name.startsWith("apollo-")).map(d=>d.name).sort();
const reg=new Set(Object.keys(j.plugins||{}));
const rows=["slug\ton_disk\tin_registry\tlayer\tstatus"];
for (const s of disk) {
  const inReg=reg.has(s);
  rows.push([s,"yes",inReg?"yes":"no",layerOf[s]||"",inReg?"MATCH":"MISSING_IN_REG"].join("\t"));
}
for (const s of [...reg].sort()) {
  if (!disk.includes(s)) rows.push([s,"no","yes",layerOf[s]||"","MISSING_ON_DISK"].join("\t"));
}
fs.writeFileSync(path.join(root,"_inventory/_worker-reports/STRICT-W1-disk-map.tsv"), rows.join("\n")+"\n");
const summary={
  disk:disk.length,reg:reg.size,
  match:disk.filter(s=>reg.has(s)).length,
  missingInReg:disk.filter(s=>!reg.has(s)),
  missingOnDisk:[...reg].filter(s=>!disk.includes(s)).sort(),
  wahaOnDisk:disk.includes("apollo-waha")
};
fs.writeFileSync(path.join(root,"_inventory/_worker-reports/STRICT-W0-summary.json"), JSON.stringify(summary,null,2));
console.log(JSON.stringify(summary,null,2));