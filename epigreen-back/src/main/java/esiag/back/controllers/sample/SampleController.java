package esiag.back.controllers.sample;

import esiag.back.models.sample.Sample;
import esiag.back.models.sample.SampleType;
import esiag.back.services.sample.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("sample")
public class SampleController {

    @Autowired
    private SampleService sampleService;

    @GetMapping("/{id}")
    public ResponseEntity<Sample> findById(@PathVariable Long id){

        return new ResponseEntity<>(sampleService.findByIdSample(id), HttpStatus.OK);
    }

    @GetMapping("all")
    public ResponseEntity<List<Sample>> findAllSample(){
        return new ResponseEntity<>(sampleService.findAllSample(), HttpStatus.OK);
    }
    @GetMapping("typeSample")
    public ResponseEntity<List<Sample>> findSamplebyType(@RequestParam SampleType type){
        return new ResponseEntity<>(sampleService.findSampleType(type), HttpStatus.OK);
    }

    @GetMapping("dateSample")
    public ResponseEntity<Sample> findLastSampleByDate() {
        return new ResponseEntity<>(sampleService.findOldestSample(), HttpStatus.OK);
    }

    // Methode pour le insert
    @PostMapping("/add")
    public ResponseEntity<Sample> addSample(@RequestBody Sample sample) {
        System.out.println("==========================");
        System.out.println("Requête reçue : " + sample);
        Sample savedSample = sampleService.addSample(sample);
        System.out.println("==========================");

        System.out.println(savedSample.toString());
        return new ResponseEntity<>(savedSample, HttpStatus.CREATED);
    }

    @PostMapping("update")
    public ResponseEntity<Sample> updateSample(@RequestBody Sample sample){
        boolean isUpdated = sampleService.updateSampleDate(sample);
        if(!isUpdated){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(sample, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteMapping(@PathVariable Long id){
        boolean isRemoved = sampleService.deleteSample(id);
        if(!isRemoved){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return  new ResponseEntity<>(id, HttpStatus.OK);
    }
}