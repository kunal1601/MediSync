package com.medisync.medisync_backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Getter
@Setter
public class ProfitLossResponsedto {

	   private double revenue;
	   
	    private double profit;
	    
	    private double gain;
	    
	    private double loss;
	    
	    private double cost;
	    
	    public ProfitLossResponsedto() {
	    }

	    public ProfitLossResponsedto(double revenue,
	                              double profit,
	                              double gain,
	                              double loss,
	                              double cost) {
	        this.revenue = revenue;
	        this.profit = profit;
	        this.gain = gain;
	        this.loss = loss;
	        this.cost = cost;
	    }
}
