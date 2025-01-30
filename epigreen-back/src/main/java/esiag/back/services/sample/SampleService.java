package esiag.back.services.sample;

import esiag.back.models.sample.Sample;
import esiag.back.models.sample.SampleType;
import esiag.back.repositories.sample.SampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//implimetation des methodes,livrrable
@Service  //annotation 'service' by spring
public class SampleService {

    @Autowired
    private SampleRepository sampleRepository;

    public Sample findOldestSample(){
        return sampleRepository.findLastSampleByDate();
    }

    public Sample findByIdSample(Long idSample) {
        Optional<Sample> optionalSample = sampleRepository.findById(idSample);
        return optionalSample.orElse(null);
    }
    public List<Sample> findSampleType(SampleType typeSample){
        return sampleRepository.findSampleType(typeSample);
    }

    public List<Sample> findAllSample(){
        return sampleRepository.findAll();
    }

    public boolean updateSampleDate(Sample updatedSample) {
        Optional<Sample> optionalSample = sampleRepository.findById(updatedSample.getIdSample());
        if(optionalSample.isPresent()){
            Sample sample = optionalSample.get();
            sample.setDateSample(updatedSample.getDateSample());
            sampleRepository.saveAndFlush(sample);
            return true;
        }
        return false;
    }

    public boolean deleteSample(Long idSample) {
        Optional<Sample> optionalSample = sampleRepository.findById(idSample);
        if (optionalSample.isPresent()) {
            optionalSample.ifPresent(sample -> sampleRepository.delete(sample));
            return true;
        }
        return false;
    }

    public Sample addSample(Sample sample) {
        // Sauvegarde le nouveau sample dans le repository
        Sample sampleInserted = sampleRepository.save(sample);
        return  sampleInserted;
    }
}